#!/bin/bash
#
#Script para sincronizar la hora con un servidor de internet
#
pm2 start /home/condor/Proyectos/condor-backend/server.js
sleep 2
sudo chmod 777 /dev/usb/lp0

