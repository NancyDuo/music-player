const music = document.getElementById('music')
const spinImg = document.getElementById('spin-img')
const progressBar = document.getElementsByClassName('progress-bar')[0]
const progressBox = document.getElementsByClassName('progress-box')[0]
const startTime = document.getElementsByClassName('start-time')[0]
const endTime = document.getElementsByClassName('end-time')[0]
const play = document.getElementsByClassName('play')[0]
const lastSong = document.getElementsByClassName('pre')[0]
const nextSong = document.getElementsByClassName('next')[0]
const songName = document.getElementsByClassName('song-name')[0]
const songAuth = document.getElementsByClassName('song-author')[0]
let playControl = document.getElementsByClassName('play-icon')[0]
let playStatus = false
const song = ['大鱼', '不染', '左手指月']
const singer = ['周深', '毛不易', '萨顶顶']
const playList = ["./song/dayu.mp3", "./song/bu-ran.mp3", "./song/left-hand.mp3"]
let songIndex = 0
let progressTimer 

//play song
playControl.addEventListener('click', () => {
	playStatus = !playStatus
	music.src = playList[songIndex]
	playMusic()
	circleSpin()
	
})

//previou song
lastSong.addEventListener('click', () => {
	preMusic()
})
//next song
nextSong.addEventListener('click', () => {	
	nextMusic()
})


const playMusic = () => {
	if (playStatus) {
		music.src = playList[songIndex]
		songAuth.innerText = singer[songIndex]
		songName.innerText = singer[songIndex]+' - '+song[songIndex]
		music.play()
		setProgressBar()
		playControl.innerHTML = '<i class="fas fa-pause"></i>'
	} else {
		music.pause()
		clearInterval(progressTimer)
		playControl.innerHTML = '<i class="fas fa-play"></i>'
	}
}

const preMusic = () => {
	songIndex = songIndex - 1
	playStatus = true
	if (songIndex < 0) {
		songIndex = 2
		playMusic()
	} else {
		playMusic()
	}
}

const nextMusic = () => {
	songIndex = songIndex + 1
	playStatus = true
	if (songIndex > 2) {
		songIndex = 0
		playMusic()
	} else {
		playMusic()
	}
}

const circleSpin = ()=>{
}

// parse durationg to time format
const parseTime=(value)=>{
	　　if (!value) return ''　　　
	　　let interval = Math.floor(value)
	　　let minute = (Math.floor(interval / 60)).toString().padStart(2, '0')
	　　let second = (interval % 60).toString().padStart(2, '0')
	　　return `${minute}:${second}`
}

// change progress bar
const changeProgressBar =()=>{
	startTime.innerHTML = parseTime(music.currentTime)
	endTime.innerHTML = parseTime(music.duration)
	const percent = music.currentTime / music.duration
	progressBar.style.width = percent * 100+ '%'
}
const setProgressBar = ()=>{
	progressTimer=setInterval(changeProgressBar,1000)
}

//start songs from selected time
progressBox.onclick = function (e) {
    clearInterval(progressTimer)
    let length = e.pageX - progressBox.offsetLeft
    let percent = length / progressBox.offsetWidth
    music.currentTime = percent * music.duration
    music.play()
    progressTimer = setInterval(changeProgressBar, 60)
  }

music.addEventListener('ended', nextMusic)
