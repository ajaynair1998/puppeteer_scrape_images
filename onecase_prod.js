// const pt = require('puppeteer')
// const fs = require('fs')
// const path = require('path')
// const https=require('https')
import Puppeteer from "puppeteer"
import fs from 'fs'
import path from 'path'
import https from 'https'

const pt=Puppeteer
import onecard from "./oneimagecard_prod.js"



async function oneCase(pt,link,fs,path,https)
{
    try{
    let __dirname = path.resolve()
    //instance of puppeteer created
    const browser = await pt.launch({ headless: false })
    const page = await browser.newPage()
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.setDefaultNavigationTimeout(0)
    
    //goto the case link
    await page.goto(link)

    //make image directory
    fs.mkdir(path.join(__dirname, 'images'), (err) =>
    {
        console.log(err)
    })

    //get pointer for clicking cards
    let pointer;

    //get axial_non_conrast images
    onecard(page,'axial_no_contrast',fs,path,https)

    //get axial_lung_window images
    pointer = await page.$('body > .container > #main > .wrapper > .two-column-flex-container > .two-column-flex-content > .user-generated-content > .well > #case-images > .image_gallery > .jcarousel-skin-radiopaedia > .jcarousel-container > .jcarousel-clip > .carousel > li[position="1"]')
    await pointer.click()
    await onecard(page,'axial_lung_window',fs,path,https)

    //get coronal_lung_window images
    pointer=await page.$('body > .container > #main > .wrapper > .two-column-flex-container > .two-column-flex-content > .user-generated-content > .well > #case-images > .image_gallery > .jcarousel-skin-radiopaedia > .jcarousel-container > .jcarousel-clip > .carousel > li[position="2"]')
    await pointer.click()
    await onecard(page,'coronal_lung_window',fs,path,https)

    //get axial hrct
    pointer = await page.$('body > .container > #main > .wrapper > .two-column-flex-container > .two-column-flex-content > .user-generated-content > .well > #case-images > .image_gallery > .jcarousel-skin-radiopaedia > .jcarousel-container > .jcarousel-clip > .carousel > li[position="3"]')
    await pointer.click()
    await onecard(page,'axial_hrct',fs,path,https)


}
catch(err)
{
    console.log(err.message,err.info)
}

}


// wrap added





//call our driver function
oneCase(pt, 'https://radiopaedia.org/cases/covid-19-pneumonia-26?lang=us',fs,path,https)
