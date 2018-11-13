import Debug from 'debug'
import { Order, Table, Saucer, Menu, Box } from '../models'
import { time } from '../config'
import  printer from 'node-thermal-printer'
const debug = new Debug('condor-cafe:db-api:Order')

export default {
  countOrder: async (day) => {
    debug('countOrder')
    const start = `${day}T00:00:00Z`
    const end = `${day}T23:59:59Z`
    return await Order.count({ 'createdAt': {'$gte': start, '$lte': end} })
  },

  findAll: (sort = '-createdAt') => {
    debug('Find all Order')
    return Order.find({ status: true }).populate({ path: 'tables'}).sort(sort)
  },

  findAllDay: (day, sort = '-createdAt') => {
    debug('Finding all Orders by Day')
    const start = `${day}T00:00:00Z`
    const end = `${day}T23:59:59Z`
    return Order.find({ 'createdAt': {'$gte': start, '$lte': end}, status: true, viewed: true })
                .populate({ path: 'tables'})
                .populate({
                  path: 'saucers',
                  populate: {
                    path: 'menu',
                    match: { status: true },
                    populate: { path: 'category' }
                  }
                }).sort(sort)
    // return Order.find({ 'createdAt': {'$gte': start, '$lte': end} })
    //             .populate({ path: 'user'})
    //             .populate({ path: 'tables' })
    //             .populate({
    //               path: 'saucers',
    //               populate: {
    //                 path: 'menu',
    //                 populate: { path: 'prices' }
    //               }
    //             })
  },

  updateViewed: (_id) => {
    debug(`Updating Order viewed ${_id}`)
    return Order.updateOne( { _id }, { $set: {viewed: false} } )
  },

  addBox: async (_id) => {
    debug(`Update accumulated box`)
    const box = await Box.findOne({ day: time().toISOString().slice(0,10) })
    if(!box)
      return {
        error: true,
        message: 'Primero debe abrir caja'
      }
    const uBox = box.period[box.period.length - 1]
    let total = 0
    if(uBox.closing == '') {
      const order = await Order.findOne({ _id }).populate({ path: 'saucers' })
      order.saucers.forEach((element) => {
        total += element.price
      })
      uBox.accumulated += total
      return box.save()
    } else {
      return {
        error: true,
        message: 'Primero debe abrir caja'
      }
    }
    // return box.save()
  },

  findById: (_id) => {
    debug(`Find Order with id ${_id}`)
    return Order.findOne({ _id, status: true })
                .populate({ path: 'user'})
                .populate({ path: 'tables' })
                .populate({
                  path: 'saucers',
                  populate: {
                    path: 'menu',
                    match: { status: true },
                    populate: { path: 'prices' }
                  }
                })
  },

  create: (o) => {
    o.createdAt = time()
    debug(`Creating new order ${o}`)
    const order = new Order(o)
    return order.save()
  },

  printCook: (obj) => {
    printer.init({
      type: 'epson',
      interface: '/dev/usb/lp0'
    })

    printer.alignCenter()
    printer.println('Condor Café')
    printer.println('Sucursal: Central')
  
    printer.drawLine()
  
    printer.println('PEDIDO A COCINA')
    printer.print(`Num: ${obj.num} `)
    printer.print('Mesa(s): ')
    for(let i = 0; i < obj.mesas.length; i++) {
      printer.print(`${obj.mesas[i]} `)
    }
    printer.newLine()
    if(obj.carry)
      printer.print('Pedido para LLEVAR')
    printer.newLine()
    printer.drawLine()

    printer.newLine()
  
    printer.alignLeft()
    printer.tableCustom([
      { text:'Cant', width: 0.1 },
      { text:'Descripcion', width: 0.76 },
      { text:'Total', width: 0.12 }
    ])
    for(let i = 0; i < obj.saucers.length; i++) {
      printer.tableCustom([
        { text: obj.saucers[i].quantity, width: 0.1 },
        { text: obj.saucers[i].nameSaucer, width: 0.76 },
        { text: obj.saucers[i].price, width: 0.12 }
      ])
    }

    printer.drawLine()
  
    printer.println('USUARIO: Condor')
    printer.println('FECHA: ' + obj.fecha)
    printer.println('POR: iofullstack.com')
  
    printer.cut()
  
    printer.execute(function(err){
      if (err) {
        console.error('Print failed', err)
      } else {
        console.log('Print done')
      }
    })
  },

  printExtract: (obj) => {
    const fecha = `${obj.fecha.slice(8,10)}/${obj.fecha.slice(5,7)}/${obj.fecha.slice(0,4)} ${obj.fecha.slice(11,19)}`

    printer.init({
      type: 'epson',
      interface: '/dev/usb/lp0'
    })

    printer.alignCenter()
    printer.println('Condor Café')
    printer.println('Sucursal: Central')

    printer.drawLine()

    printer.println('EXTRACTO DE CUENTA')
    printer.print(`Num: ${obj.numOrder} `)
    printer.print('Mesa(s): ')
    for(let i = 0; i < obj.tables.length; i++) {
      printer.print(`${obj.tables[i].numTable} `)
    }
    printer.newLine()
    if(obj.carry)
      printer.print('Pedido para LLEVAR')
    printer.newLine()
    printer.drawLine()

    printer.newLine()

    printer.alignLeft()
    printer.tableCustom([
      { text:'Cant', width: 0.1 },
      { text:'Descripcion', width: 0.76 },
      { text:'Prec', width: 0.12 }
    ])
    for(let i = 0; i < obj.saucers.length; i++) {
      printer.tableCustom([
        { text: obj.saucers[i].quantity, width: 0.1 },
        { text: obj.saucers[i].nameSaucer, width: 0.76 },
        { text: obj.saucers[i].price, width: 0.12 }
      ])
    }

    printer.alignRight()
    printer.newLine()
    printer.print(`TOTAL: ${obj.total}`)
    printer.newLine()
    printer.alignLeft()

    printer.drawLine()

    printer.println('USUARIO: Condor')
    printer.println('FECHA: ' + fecha)
    printer.println('POR: iofullstack.com')

    printer.cut()

    printer.execute(function(err){
      if (err) {
        console.error('Print failed', err)
      } else {
        console.log('Print done')
      }
    })
  },

  printPago: (obj) => {
    const fecha = `${obj.fecha.slice(8,10)}/${obj.fecha.slice(5,7)}/${obj.fecha.slice(0,4)} ${obj.fecha.slice(11,19)}`

    printer.init({
      type: 'epson',
      interface: '/dev/usb/lp0'
    })

    printer.alignCenter()
    printer.println('Condor Café')
    printer.println('Sucursal: Central')

    printer.drawLine()

    printer.println('COMPROBANTE DE PAGO')
    printer.print(`Num: ${obj.numOrder} `)
    printer.print('Mesa(s): ')
    for(let i = 0; i < obj.tables.length; i++) {
      printer.print(`${obj.tables[i].numTable} `)
    }
    printer.newLine()
    if(obj.carry)
      printer.print('Pedido para LLEVAR')
    printer.newLine()
    printer.drawLine()

    printer.newLine()

    printer.alignLeft()
    printer.tableCustom([
      { text:'Cant', width: 0.1 },
      { text:'Descripcion', width: 0.76 },
      { text:'Prec', width: 0.12 }
    ])
    for(let i = 0; i < obj.saucers.length; i++) {
      printer.tableCustom([
        { text: obj.saucers[i].quantity, width: 0.1 },
        { text: obj.saucers[i].nameSaucer, width: 0.76 },
        { text: obj.saucers[i].price, width: 0.12 }
      ])
    }

    printer.alignRight()
    printer.newLine()
    printer.print(`TOTAL: ${obj.total}`)
    printer.newLine()
    printer.alignLeft()

    printer.drawLine()

    printer.println('USUARIO: Condor')
    printer.println('FECHA: ' + fecha)
    printer.println('POR: iofullstack.com')

    printer.cut()

    printer.execute(function(err){
      if (err) {
        console.error('Print failed', err)
      } else {
        console.log('Print done')
      }
    })
  },

  preparePrintCook: async (obj) => {
    const fecha = `${obj.createdAt.toISOString().slice(8,10)}/${obj.createdAt.toISOString().slice(5,7)}/${obj.createdAt.toISOString().slice(0,4)} ${obj.createdAt.toISOString().slice(11,19)}`
    const num = obj.numOrder
    let mesas = []
    let saucers = []

    for(let i=0; i < obj.tables.length; i++) {
      let mesa = await Table.findOne({ _id: obj.tables[i] })
      mesas.push(mesa.numTable)
    }

    for(let i=0; i < obj.saucers.length; i++) {
      let saucer = await Saucer.findOne({ _id: obj.saucers[i] })
      let menu = await Menu.findOne({ _id: saucer.menu })
      let nameSaucer = `${menu.name} (${saucer.namePrice})`
      saucer.extra.forEach(ex => {
        nameSaucer += ` +${ex.price} ${ex.name}`
      })
      saucers.push({
        quantity: saucer.quantity,
        nameSaucer: nameSaucer,
        price: saucer.price
      })
    }

    return {
      fecha,
      num,
      carry: obj.carry,
      mesas,
      saucers
    }
  },

  preparePrintCook2: async (obj) => {
    const fecha = `${obj.createdAt.slice(8,10)}/${obj.createdAt.slice(5,7)}/${obj.createdAt.slice(0,4)} ${obj.createdAt.slice(11,19)}`
    const num = obj.numOrder
    let mesas = []
    let saucers = []

    for(let i=0; i < obj.tables.length; i++) {
      mesas.push(obj.tables[i].numTable)
    }

    for(let i=0; i < obj.saucers.length; i++) {
      let saucer = obj.saucers[i]
      let menu = await Menu.findOne({ _id: saucer.menu })
      let nameSaucer = `${menu.name} (${saucer.namePrice})`
      saucer.extra.forEach(ex => {
        nameSaucer += ` +${ex.price} ${ex.name}`
      })
      saucers.push({
        quantity: saucer.quantity,
        nameSaucer: nameSaucer,
        price: saucer.price
      })
    }

    return {
      fecha,
      num,
      carry: obj.carry,
      mesas,
      saucers
    }
  }
}
