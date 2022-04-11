const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const moment = require('moment-timezone')
const { wait, banner, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const { color } = require('./lib/color')
const _welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))

require('./Dhani.js')
nocache('./Dhani.js', module => console.log(`${module} telah di update !!`))

const starts = async (Dhani = new WAConnection()) => {
    Dhani.logger.level = 'warn'
    Dhani.version = [2, 2143, 3]
    console.log(banner.string)
    Dhani.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan Qrnya Kak Waktu Cuma 20 Detik !!'))
    })

    fs.existsSync('./session.json') && Dhani.loadAuthInfo('./session.json')
    Dhani.on('connecting', () => {
        start('2', 'Menghubungkan...')
    })
    Dhani.on('open', () => {
        success('2', 'Done Sudah Terhubung')
    })
    await Dhani.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(Dhani.base64EncodedAuthInfo(), null, '\t'))

    Dhani.on('chat-update', async (message) => {
        require('./Dhani.js')(Dhani, message, _welkom)
    })
Dhani.on("group-participants-update", async (anu) => {

    const isWelkom = _welkom.includes(anu.jid)
    try {
      groupMet = await Dhani.groupMetadata(anu.jid)
      groupMembers = groupMet.participants
      groupAdmins = getGroupAdmins(groupMembers)
      mem = anu.participants[0]

      console.log(anu)
      try {
        pp_user = await Dhani.getProfilePicture(mem)
      } catch (e) {
        pp_user = "https://telegra.ph/file/c9dfa715c26518201f478.jpg"
      }
      try {
        pp_grup = await Dhani.getProfilePicture(anu.jid)
      } catch (e) {
        pp_grup =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
      }
      if (!isWelkom) return
      if (anu.action == 'add') {
	  num = anu.participants[0]
	  mdata = await Dhani.groupMetadata(anu.jid)
      let buff = await getBuffer(pp_user)
	  teks = `Halo @${num.split('@')[0]}, Selamat datang di\n${mdata.subject}, Ketik *.list* untuk cek harga dan menu😎`
	  Dhani.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
      } else if (anu.action == 'remove') {
	  num = anu.participants[0]
	  mdata = await Dhani.groupMetadata(anu.jid)
	  let buff = await getBuffer(pp_user)
	  teks = `Selamat Tinggal @${num.split('@')[0]}!\nTerimakasih Telah Bergabung Di Grup\n\nKalo Balik Jangan Lupa Bawa Gorengan Buat Anggota Disini`
	  Dhani.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
      }
    } catch (e) {
      console.log("Error : %s", color(e, "red"))
    }

  })
}

function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'Sekarang Sedang Di Awasi Oleh Rafli !!')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()
