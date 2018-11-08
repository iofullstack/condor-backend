import Debug from 'debug'
import { Order, Table, Saucer, Menu } from '../models'
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
    return Order.find({ 'createdAt': {'$gte': start, '$lte': end}, status: true })
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
    for(let i = 0; i < obj.tables.length; i++) {
      printer.print(`${obj.tables[i]} `)
    }
    printer.drawLine()
    if(obj.carry)
      printer.print('Pedido para LLEVAR')
    printer.drawLine()

    printer.newLine()
  
    printer.alignLeft()
    printer.tableCustom([
      { text:'Cant', width: 0.1 },
      { text:'Descripcion', width: 0.7 },
      { text:'Total', width: 0.18 }
    ])
    for(let i = 0; i < obj.saucers.length; i++) {
      printer.tableCustom([
        { text: obj.saucers[i].quantity, width: 0.1 },
        { text: obj.saucers[i].nameSaucer, width: 0.7 },
        { text: obj.saucers[i].price, width: 0.18 }
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

  preparePrintCook: async (obj) => {
    const fecha = `${obj.createdAt.toISOString().slice(8,10)}/${obj.createdAt.toISOString().slice(5,7)}/${obj.createdAt.toISOString().slice(0,4)} ${obj.createdAt.toISOString().slice(11,19)}`
    const num = obj.numOrder
    let mesas = []
    let saucers = []

    for(let i=0; i < obj.tables.length; i++) {
      let mesa = await Table.findOne({ _id: obj.tables[i] })
      console.log(mesa.numTable)
      mesas.push(mesa.numTable)
    }

    for(let i=0; i < obj.saucers.length; i++) {
      let saucer = await Saucer.findOne({ _id: obj.saucers[i] })
      let menu = await Menu.findOne({ _id: saucer.menu })
      let nameSaucer = menu.name
      saucer.extra.forEach(ex => {
        nameSaucer += ` +${ex.price} ${ex.name} `
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
