import Debug from "debug";
import { Order, Table, Saucer, Menu, Box } from "../models";
import { time } from "../config";
import printer from "node-thermal-printer";
const debug = new Debug("condor-cafe:db-api:Order");

export default {
  countOrder: async (day) => {
    debug("countOrder");
    const start = `${day}T00:00:00Z`;
    const end = `${day}T23:59:59Z`;
    return await Order.count({ createdAt: { $gte: start, $lte: end } });
  },

  findAll: (sort = "-createdAt") => {
    debug("Find all Order");
    return Order.find({ status: true }).populate({ path: "tables" }).sort(sort);
  },

  findAllDeleted: (sort = "-createdAt") => {
    debug("Find all Order Deleted");
    return Order.find({ status: false })
      .populate({ path: "tables" })
      .populate({
        path: "saucers",
        populate: {
          path: "menu",
          populate: { path: "category" },
        },
      })
      .sort(sort);
  },

  findAllHideViewed: (sort = "-createdAt") => {
    debug("Find all Order hide viewed");
    return Order.find({ status: true, viewed: true })
      .populate({ path: "tables" })
      .populate({
        path: "saucers",
        populate: {
          path: "menu",
          populate: { path: "category" },
        },
      })
      .sort(sort);
  },

  findAllDayCook: (day, sort = "-createdAt", viewedCook = true) => {
    debug("Finding all Orders by Day on Cook");
    const start = `${day}T00:00:00Z`;
    const end = `${day}T23:59:59Z`;

    return Order.find({
      createdAt: { $gte: start, $lte: end },
      status: true,
      viewedCook,
    })
      .populate({ path: "tables" })
      .populate({
        path: "saucers",
        populate: {
          path: "menu",
          match: { status: true },
          populate: { path: "category" },
        },
      })
      .sort(sort);
  },

  findAllDay: (day, sort = "-createdAt", viewed = true, carry = false) => {
    debug("Finding all Orders by Day");
    const start = `${day}T00:00:00Z`;
    const end = `${day}T23:59:59Z`;
    if (carry)
      return Order.find({
        createdAt: { $gte: start, $lte: end },
        status: true,
        viewed,
        carry,
      })
        .populate({ path: "tables" })
        .populate({
          path: "saucers",
          populate: {
            path: "menu",
            match: { status: true },
            populate: { path: "category" },
          },
        })
        .sort(sort);
    else
      return Order.find({
        createdAt: { $gte: start, $lte: end },
        status: true,
        viewed,
      })
        .populate({ path: "tables" })
        .populate({
          path: "saucers",
          populate: {
            path: "menu",
            match: { status: true },
            populate: { path: "category" },
          },
        })
        .sort(sort);
  },

  findAllDayTable: (day, idTable, sort = "-createdAt", viewed = true) => {
    debug("Finding all Orders by Day");
    const start = `${day}T00:00:00Z`;
    const end = `${day}T23:59:59Z`;
    return Order.find({
      createdAt: { $gte: start, $lte: end },
      status: true,
      viewed,
      tables: { $in: [idTable] },
      carry: false,
    })
      .populate({ path: "tables" })
      .populate({
        path: "saucers",
        populate: {
          path: "menu",
          match: { status: true },
          populate: { path: "category" },
        },
      })
      .sort(sort);
  },

  updateViewed: (_id) => {
    debug(`Updating Order viewed ${_id}`);
    return Order.updateOne({ _id }, { $set: { viewed: false } });
  },

  updateViewedCook: (_id) => {
    debug(`Updating Order viewedCook ${_id}`);
    return Order.updateOne({ _id }, { $set: { viewedCook: false } });
  },

  addBox: async (_id) => {
    debug(`Update accumulated box`);
    const box = await Box.findOne({ day: time().toISOString().slice(0, 10) });
    if (!box)
      return {
        error: true,
        message: "Primero debe abrir caja",
      };
    const uBox = box.period[box.period.length - 1];
    let total = 0;
    if (uBox.closing == "") {
      const order = await Order.findOne({ _id }).populate({ path: "saucers" });
      order.saucers.forEach((element) => {
        console.log(element.price);
        total += element.price;
      });
      console.log(total);
      uBox.accumulated += total;
      return box.save();
    } else {
      return {
        error: true,
        message: "Primero debe abrir caja",
      };
    }
    // return box.save()
  },

  addBoxAllOrders: async (orders) => {
    debug(`Update accumulated box all orders`);
    const box = await Box.findOne({ day: time().toISOString().slice(0, 10) });
    if (!box)
      return {
        error: true,
        message: "Primero debe abrir caja",
      };
    const uBox = box.period[box.period.length - 1];
    if (uBox.closing == "") {
      orders.forEach((order) => {
        let total = 0;
        order.saucers.forEach((element) => {
          total += element.price;
        });
        uBox.accumulated += total;
      });
      return box.save();
    } else {
      return {
        error: true,
        message: "Primero debe abrir caja",
      };
    }
    // return box.save()
  },

  findById: (_id) => {
    debug(`Find Order with id ${_id}`);
    return Order.findOne({ _id, status: true })
      .populate({ path: "user" })
      .populate({ path: "tables" })
      .populate({
        path: "saucers",
        populate: {
          path: "menu",
          match: { status: true },
          populate: { path: "prices" },
        },
      });
  },

  create: (o) => {
    o.createdAt = time();
    debug(`Creating new order ${o}`);
    const order = new Order(o);
    return order.save();
  },

  delete: async (_id) => {
    debug(`Updating status order ${_id}`);
    let order = await Order.findOne({ _id, viewed: true });
    if (order) return Order.updateOne({ _id }, { $set: { status: false } });
    else return false;
  },

  printCook: (obj) => {
    printer.init({
      type: "epson",
      interface: "/dev/usb/lp0",
    });

    printer.alignCenter();
    printer.println("Condor Café");
    printer.println("Sucursal: Central");

    printer.drawLine();

    printer.println("PEDIDO A COCINA");
    printer.print(`Num: ${obj.num} `);
    printer.print("Mesa(s): ");
    for (let i = 0; i < obj.mesas.length; i++) {
      printer.print(`${obj.mesas[i]} `);
    }
    printer.newLine();
    if (obj.carry) printer.print("Pedido para LLEVAR");
    printer.newLine();
    printer.drawLine();

    printer.newLine();

    printer.alignLeft();
    printer.tableCustom([
      { text: "Cant", width: 0.1 },
      { text: "Descripcion", width: 0.76 },
      { text: "Total", width: 0.12 },
    ]);
    for (let i = 0; i < obj.saucers.length; i++) {
      printer.tableCustom([
        { text: obj.saucers[i].quantity, width: 0.1 },
        { text: obj.saucers[i].nameSaucer, width: 0.76 },
        { text: obj.saucers[i].price, width: 0.12 },
      ]);
    }

    printer.drawLine();

    printer.println("USUARIO: Condor");
    printer.println("FECHA: " + obj.fecha);
    printer.println("POR: iofullstack.com");

    printer.cut();

    printer.execute(function (err) {
      if (err) {
        console.error("Print failed", err);
      } else {
        console.log("Print done");
      }
    });
  },

  printExtract: (obj) => {
    const fecha = `${obj.fecha.slice(8, 10)}/${obj.fecha.slice(
      5,
      7
    )}/${obj.fecha.slice(0, 4)} ${obj.fecha.slice(11, 19)}`;

    printer.init({
      type: "epson",
      interface: "/dev/usb/lp0",
    });

    printer.alignCenter();
    printer.println("Condor Café");
    printer.println("Sucursal: Central");

    printer.drawLine();

    printer.println("EXTRACTO DE CUENTA");
    printer.print(`Num: ${obj.numOrder} `);
    printer.print("Mesa(s): ");
    for (let i = 0; i < obj.tables.length; i++) {
      printer.print(`${obj.tables[i].numTable} `);
    }
    printer.newLine();
    if (obj.carry) printer.print("Pedido para LLEVAR");
    printer.newLine();
    printer.drawLine();

    printer.newLine();

    printer.alignLeft();
    printer.tableCustom([
      { text: "Cant", width: 0.1 },
      { text: "Descripcion", width: 0.76 },
      { text: "Prec", width: 0.12 },
    ]);
    for (let i = 0; i < obj.saucers.length; i++) {
      printer.tableCustom([
        { text: obj.saucers[i].quantity, width: 0.1 },
        { text: obj.saucers[i].nameSaucer, width: 0.76 },
        { text: obj.saucers[i].price, width: 0.12 },
      ]);
    }

    printer.alignRight();
    printer.newLine();
    printer.print(`TOTAL: ${obj.total}`);
    printer.newLine();
    printer.alignLeft();

    printer.drawLine();

    printer.println("USUARIO: Condor");
    printer.println("FECHA: " + fecha);
    printer.println("POR: iofullstack.com");

    printer.cut();

    printer.execute(function (err) {
      if (err) {
        console.error("Print failed", err);
      } else {
        console.log("Print done");
      }
    });
  },

  printPago: (obj) => {
    const fecha = `${obj.fecha.slice(8, 10)}/${obj.fecha.slice(
      5,
      7
    )}/${obj.fecha.slice(0, 4)} ${obj.fecha.slice(11, 19)}`;

    printer.init({
      type: "epson",
      interface: "/dev/usb/lp0",
    });

    printer.alignCenter();
    printer.println("Condor Café");
    printer.println("Sucursal: Central");

    printer.drawLine();

    printer.println("COMPROBANTE DE PAGO");
    printer.print(`Num: ${obj.numOrder} `);
    printer.print("Mesa(s): ");
    for (let i = 0; i < obj.tables.length; i++) {
      printer.print(`${obj.tables[i].numTable} `);
    }
    printer.newLine();
    if (obj.carry) printer.print("Pedido para LLEVAR");
    printer.newLine();
    printer.drawLine();

    printer.newLine();

    printer.alignLeft();
    printer.tableCustom([
      { text: "Cant", width: 0.1 },
      { text: "Descripcion", width: 0.76 },
      { text: "Prec", width: 0.12 },
    ]);
    for (let i = 0; i < obj.saucers.length; i++) {
      printer.tableCustom([
        { text: obj.saucers[i].quantity, width: 0.1 },
        { text: obj.saucers[i].nameSaucer, width: 0.76 },
        { text: obj.saucers[i].price, width: 0.12 },
      ]);
    }

    printer.alignRight();
    printer.newLine();
    printer.print(`TOTAL: ${obj.total}`);
    printer.newLine();
    printer.alignLeft();

    printer.drawLine();

    printer.println("USUARIO: Condor");
    printer.println("FECHA: " + fecha);
    printer.println("POR: iofullstack.com");

    printer.cut();

    printer.execute(function (err) {
      if (err) {
        console.error("Print failed", err);
      } else {
        console.log("Print done");
      }
    });
  },

  preparePrintCook: async (obj) => {
    const fecha = `${obj.createdAt.toISOString().slice(8, 10)}/${obj.createdAt
      .toISOString()
      .slice(5, 7)}/${obj.createdAt.toISOString().slice(0, 4)} ${obj.createdAt
      .toISOString()
      .slice(11, 19)}`;
    const num = obj.numOrder;
    let mesas = [];
    let saucers = [];

    for (let i = 0; i < obj.tables.length; i++) {
      let mesa = await Table.findOne({ _id: obj.tables[i] });
      mesas.push(mesa.numTable);
    }

    for (let i = 0; i < obj.saucers.length; i++) {
      let saucer = await Saucer.findOne({ _id: obj.saucers[i] });
      let menu = await Menu.findOne({ _id: saucer.menu });
      let nameSaucer = `${menu.name} (${saucer.namePrice})`;
      saucer.extra.forEach((ex) => {
        nameSaucer += ` +${ex.price} ${ex.name}`;
      });
      saucers.push({
        quantity: saucer.quantity,
        nameSaucer: nameSaucer,
        price: saucer.price,
      });
    }

    return {
      fecha,
      num,
      carry: obj.carry,
      mesas,
      saucers,
    };
  },

  preparePrintCook2: async (obj) => {
    const fecha = `${obj.createdAt.slice(8, 10)}/${obj.createdAt.slice(
      5,
      7
    )}/${obj.createdAt.slice(0, 4)} ${obj.createdAt.slice(11, 19)}`;
    const num = obj.numOrder;
    let mesas = [];
    let saucers = [];

    for (let i = 0; i < obj.tables.length; i++) {
      mesas.push(obj.tables[i].numTable);
    }

    for (let i = 0; i < obj.saucers.length; i++) {
      let saucer = obj.saucers[i];
      let menu = await Menu.findOne({ _id: saucer.menu });
      let nameSaucer = `${menu.name} (${saucer.namePrice})`;
      saucer.extra.forEach((ex) => {
        nameSaucer += ` +${ex.price} ${ex.name}`;
      });
      saucers.push({
        quantity: saucer.quantity,
        nameSaucer: nameSaucer,
        price: saucer.price,
      });
    }

    return {
      fecha,
      num,
      carry: obj.carry,
      mesas,
      saucers,
    };
  },

  generarPDFCook: async (obj) => {
    const saucers = [];

    let docDefinition = {
      pageSize: "C7",
      /*pageSize: {
        width: 595.28,
        height: "auto",
      },*/
      pageMargins: [5, 0, 5, 0],
      content: [
        {
          text: [
            "Condor Café\n",
            "Sucursal: Central\n",
            "PEDIDO A COCINA\n",
            `Num: ${obj.num}\n`,
            `Mesa(s): ${obj.mesas[0]}\n`,
            `${obj.carry ? "Pedido para LLEVAR" : ""}\n`,
          ],
          style: "content",
          bold: false,
        },
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          alignment: "center",
          margin: [10, 10, 10, 10],
        },
        content: {
          fontSize: 12,
          alignment: "center",
          margin: [30, 10, 30, 20],
        },
        insert: {
          fontSize: 12,
          alignment: "center",
          margin: [30, 10, 30, 10],
        },
        tableExample: {
          alignment: "center",
          margin: [0, 5, 0, 15],
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };
    for (let el of obj.saucers) {
      saucers.push([
        { text: el.quantity },
        { text: el.nameSaucer },
        { text: el.price },
      ]);
    }

    const dd = {
      style: "tableExample",
      table: {
        body: [
          [
            { text: "Cant", bold: true },
            { text: "Descripcion", bold: true },
            { text: "Total", bold: true },
          ],
          ...saucers,
        ],
      },
    };
    const dd2 = {
      text: [
        { text: "USUARIO: ", bold: true },
        { text: "Admin\n", bold: false },
        { text: "FECHA: ", bold: true },
        { text: `${obj.fecha}\n`, bold: false },
        { text: "POR: ", bold: true },
        { text: "wayra204genia@gmail.com\n", bold: false },
      ],
      alignment: "center",
    };

    docDefinition.content.push(dd);
    docDefinition.content.push(dd2);

    return docDefinition;
  },
};
