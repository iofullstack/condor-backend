import Debug from 'debug'
import { Order, Table, Saucer, Menu } from '../models'
import { time } from '../config'
import { printer } from 'node-thermal-printer'

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

  printCook: async (obj) => {
    const fecha = `${obj.createdAt.toISOString().slice(8,10)}/${obj.createdAt.toISOString().slice(5,7)}/${obj.createdAt.toISOString().slice(0,4)} ${obj.createdAt.toISOString().slice(11,19)}`
    const num = obj.numOrder

    printer.init({
      type: 'epson',
      interface: '/dev/usb/lp0'
    })

    printer.alignCenter()
    printer.println('Condor Café')
    printer.println('Sucursal: Central')
  
    printer.drawLine()
  
    printer.println('PEDIDO A COCINA')
    printer.print(`Num: ${num} `)
    printer.print('Mesa(s): ')
    obj.tables.forEach(async el => {
      let mesa = await Table.findOne({ _id: el })
      printer.print(`${mesa.numTable} `)
    })
    printer.drawLine()
    if(obj.carry)
      printer.print('Pedido para LLEVAR')
    printer.drawLine()

    printer.newLine()
  
    printer.alignLeft()
    printer.tableCustom([                               // Prints table with custom settings (text, align, width, bold)
      { text:'Cant', width: 0.1 },
      { text:'Descripcion', width: 0.7 },
      { text:'Total', width: 0.18 }
    ])
    obj.saucers.forEach(async el => {
      let saucer = await Saucer.findOne({ _id: el })
      let menu = await Menu.findOne({ _id: el.menu })
      let nameSaucer = menu.name
      saucer.extra.forEach(async ex => {
        nameSaucer += ` +${ex.price} ${ex.name} `
      })
      printer.tableCustom([
        { text: saucer.quantity, width: 0.1 },
        { text: nameSaucer, width: 0.7 },
        { text: saucer.price, width: 0.18 }
      ])
    })

    printer.drawLine()
  
    printer.println('USUARIO: Condor')
    printer.println('FECHA: 04/11/2018 11:49 p.m.')
    printer.println('POR: iofullstack.com')
  
    printer.cut()
  
    printer.execute(function(err){
      if (err) {
        console.error('Print failed', err)
      } else {
        console.log('Print done')
      }
    })
  }
}
