// const pt = require('puppeteer')
// const fs = require('fs')
// const path = require('path')
// const https = require('https')

async function main(page, name, fs, path, https)
{
    try
    {
        let pointer;
        let __dirname = path.resolve()
        //Press the up button till it reaches top
        pointer = await page.$('body > .container > #main > .wrapper > .two-column-flex-container > .two-column-flex-content > .user-generated-content > .well > #case-images > .image_gallery > .stack > .relative-fill > .relative-fill > .scrollbar > a.up ')

        for (let i = 0; i < 100; i++)
        {

            await pointer.click()


        }

        //create folder with name given

        fs.mkdir(path.join(__dirname, 'images', name), (err) =>
        {
            console.log(err)
        })





        //looping through each image
        for (let i = 0; i < 100; i++)
        {


            //set filename for each loop iteration
            let filename = i + '.jpg'

            //set filepath to create folder
            let filePath = path.resolve(path.join(__dirname, 'images'), name, filename)


            //getting the link from the current image
            let file = await page.evaluate(() =>
            {
                let x = document.getElementById('offline-workflow-study-large-image')
                let attribute = x.getAttribute('src')
                return attribute

            })

            //creating the pipeline
            const writeStream = fs.createWriteStream(filePath)

            //writing one file into disk
            https.get(file, response =>
            {
                response.pipe(writeStream)
            })

            pointer = await page.$('body > .container > #main > .wrapper > .two-column-flex-container > .two-column-flex-content > .user-generated-content > .well > #case-images > .image_gallery > .stack > .relative-fill > .relative-fill > .scrollbar > a.down ')
            await pointer.click()


        }

    }
    catch (err)
    {
        console.log(err.message, err.info)
    }
}
//call function now disabled
// main()

export default main