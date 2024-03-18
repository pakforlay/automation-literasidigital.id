import puppeteer from 'puppeteer'
import { executablePath } from 'puppeteer'
import moment from 'moment'
import readlineSync from 'readline-sync'
import delay from 'delay'

const browserPageOpt = { waitUntil: 'networkidle0' }
const browserOptions = {
    executablePath: executablePath("chrome"),
    headless: false,
    args: [
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"',
        '--no-sandbox',
    ]
};

const linkRegist = readlineSync.question('Masukkan Link Pendaftaran : ')
const isiEmail = readlineSync.question('Masukkan Email : ')
const nomorHp = readlineSync.question('Masukkan Nomor HP : ')
const namaLengkap = readlineSync.question('Nama Lengkap : ')
const usia = readlineSync.question('Masukkan Usia : ')
const univ = readlineSync.question('Masukkan univ : ')
const prov = readlineSync.question('Masukkan Provinsi (Harap Isi Provinsi dengan Lengkap agar tidak error, contoh DKI Jakarta) : ')
const kab = readlineSync.question('Masukkan Provinsi (Harap Isi Kabupaten dengan Lengkap agar tidak error, contoh Jakarta Selatan) : ')


//selector clik
const nextStep = `/html/body/div[2]/div[2]/div[3]/form/button`
const nextStep2 = `/html/body/div[2]/div[2]/div/form/button`

//selector input
const textEmailSelector = `#email`
const textFormNomorHp = `#no_handphone`
const textformFullName = `#nama`
const textformUsia = `#usia`
const textCommunity = `#data_identitas_lain`

// selector pilihan
const selectorGenMan = `#jenis_kelamin > option:nth-child(1)`
const selectorGenLad = `#jenis_kelamin > option:nth-child(2)`

// selector pekerjaan
const selectorMahasiswa = `#pekerjaan_id > option:nth-child(2)`

// selector pendidikan
const selectorSekolahDasar = `#pendidikan_id > option:nth-child(2)`
const selectorSekolahPeratama = `#pendidikan_id > option:nth-child(3)`
const selectorSekolahAtas = `#pendidikan_id > option:nth-child(4)`
const SelectorSarjanaDSatu = `#pendidikan_id > option:nth-child(5)`
const SelectorSarjanaDdua = `#pendidikan_id > option:nth-child(6)`
const SelectorSarjanaDtiga = `#pendidikan_id > option:nth-child(7)`
const SelectorSarjanaSsatu = `#pendidikan_id > option:nth-child(8)`
const SelectorSarjanaSdua = `#pendidikan_id > option:nth-child(9)`
const SelectorSarjanaStiga = `#pendidikan_id > option:nth-child(10)`

// selector domisili
const textinputProv = `#react-select-2-input`
const textinputKab = `#react-select-3-input`

//captcha
const captcha = `#captchaAnswer`

function printLog(str) {
    const date = moment().format('HH:mm:ss')
    console.log(`[${date}] ${str}`)
}

(async () => {
    const browser = await puppeteer.launch(browserOptions)
    const page = await browser.newPage()
    
    await page.goto(linkRegist, browserPageOpt)
    printLog("Berhasil membuka halaman registrasi")
    await delay(2000)

    await page.waitForSelector(textEmailSelector)
    const textEmail = await page.$(textEmailSelector)
    await textEmail.type(isiEmail)
    await textEmail.dispose()
    printLog("Berhasil memasukkan email")
    await delay(2000)

    await page.waitForSelector(textFormNomorHp)
    const textNumHp = await page.$(textFormNomorHp)
    await textNumHp.type(nomorHp)
    await textEmail.dispose()
    printLog("Berhasil memasukkan nomor hp")
    await delay(2000)

    const selectedElement = await page.$x(nextStep)
    await selectedElement[0].click()
    printLog("Isi Form Kedua")
    await delay(2000)

    await page.waitForSelector(textformFullName)
    const isiNama = await page.$(textformFullName)
    await isiNama.type(namaLengkap)
    await textEmail.dispose()
    printLog("Berhasil memasukan Nama Lengkap")
    await delay(2000)

    await page.waitForSelector(textformUsia)
    const isiUsia = await page.$(textformUsia)
    await isiUsia.type(usia)
    await isiUsia.dispose()
    printLog("Berhasil memasukan usia")
    await delay(2000)

    await page.waitForSelector(textCommunity)
    const isiSekolah = await page.$(textCommunity)
    await isiSekolah.type(univ)
    await isiSekolah.dispose()
    printLog("Berhasil memasukkan data pendidikan")
    await delay(2000)

    await page.waitForSelector(textinputProv)
    const isiProvinsi = await page.$(textinputProv)
    await isiProvinsi.type(prov)
    await isiProvinsi.press('Enter')
    await isiProvinsi.dispose()
    printLog("Berhasil memasukkan data Provinsi")
    await delay(2000)

    await page.waitForSelector(textinputKab)
    const isiKabupaten = await page.$(textinputKab)
    await isiKabupaten.type(kab)
    await isiKabupaten.press('Enter')
    await isiKabupaten.dispose()
    printLog("Berhasil memasukkan data Kabupaten")
    await delay(2000)

    const gender = readlineSync.question('Apakah Anda seorang pria atau wanita? (pria/wanita): ');
        if (gender === 'pria') {
            await page.evaluate(() => {
            const selectElement = document.querySelector('#jenis_kelamin > option:nth-child(1)');
            selectElement.selected = true; 
            const event = new Event('change', { bubbles: true });
            selectElement.dispatchEvent(event);
            console.log('Berhasil memasukkan data pria')
            });
        } else if (gender === 'wanita') {
            await page.evaluate(() => {
            const selectElement = document.querySelector('#jenis_kelamin > option:nth-child(2)');
            selectElement.selected = true; 
            const event = new Event('change', { bubbles: true });
            selectElement.dispatchEvent(event);
            console.log('Berhasil memasukkan data wanita')
            });
        } else {
            console.error('Jenis kelamin tidak valid');
            
        }
    
    var typeCaptcha = readlineSync.question('Masukkan Captcha : ')
    await page.waitForSelector(captcha)
    const isiCaptcha = await page.$(captcha)
    await isiCaptcha.type(typeCaptcha)
    await isiCaptcha.dispose()
    printLog("Berhasil memasukkan captcha")
    await delay(2000)

    await page.waitForSelector('#terms')
    const clickSetuju = await page.$('#terms')
    await clickSetuju.click()
    await clickSetuju.dispose()
    await delay(2000)

    await page.evaluate(() => {
            const selectJob = document.querySelector('#pekerjaan_id > option:nth-child(2)')
            selectJob.selected = true;
            const event = new Event('change', { bubbles: true })
            selectJob.dispatchEvent(event)
            console.log('Berhasil memasukkan data pekerjaan')
        }
    );

    await page.evaluate(() => {
            const selectStudy = document.querySelector('#pendidikan_id > option:nth-child(9)')
            selectStudy.selected = true;
            const event = new Event('change', { bubbles:true })
            selectStudy.dispatchEvent(event)
            console.log('Berhasil memasukkan data riwayat pendidikan')
        }
    )

    const selectedsElement = await page.$x(nextStep2)
    await selectedsElement[0].click()
    printLog("Berhasil isi Form kedua")
    await delay(2000)
    printLog('Melanjutkan Isi Kuisioner secara random')

    const kuisionerPertama = await page.$x('/html/body/div[2]/div[2]/div[3]/form/div[1]/div/ul/li[1]/div/input')
    await kuisionerPertama[0].click()
    await delay(2000)

    const kuisionerDua = await page.$x('/html/body/div[2]/div[2]/div[3]/form/div[2]/div/ul/li[2]/div/input')
    await kuisionerDua[0].click()
    await delay(2000)

    const kuisionerTiga = await page.$x('/html/body/div[2]/div[2]/div[3]/form/div[3]/div/ul/li[3]/div/input')
    await kuisionerTiga[0].click()
    await delay(2000)

    const kuisionerEmpat = await page.$x('/html/body/div[2]/div[2]/div[3]/form/div[4]/div/ul/li[4]/div/input')
    await kuisionerEmpat[0].click()
    await delay(2000)

    const kuisionerLima = await page.$x('/html/body/div[2]/div[2]/div[3]/form/div[5]/div/ul/li[1]/div/input')
    await kuisionerLima[0].click()
    await delay(2000)

    const klikKusioner = await page.$x('/html/body/div[2]/div[2]/div[3]/form/div[6]/button')
    await klikKusioner[0].click()
    printLog('Proses Pendaftaran Kegiatan Berhasil Dilakukan')
    await delay(2000)
})();