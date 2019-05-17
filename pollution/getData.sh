#!/usr/bin/env bash

URL="https://dservices3.arcgis.com/o7Q3o5SkiSeZD5LK/arcgis/services/mes_aura_horaire_poll_princ/WFSServer?service=wfs&request=getcapabilities&SERVICE=WFS&version=2.0.0&TYPENAME=mes_aura_horaire_no&REQUEST=GetFeature&SRSNAME=urn:ogc:def:crs:EPSG::4171&outputFormat=geojson"

curl "$URL" > ./data.json

node convert.js