// ================ videos stored here =================== 
let vidoesStorage = [
    {
        videoThumbnail: 'thumbnail.jpg',
        videoImg: 'test-img.jpg',
        videoName: 'Introduction In Hindi',
        videoCreator: 'HTML',
        videoLink: 'https://dl.dropboxusercontent.com/s/qa4y30ra1zp30vp/HTML%20Introduction%20in%20Hindi%20Urdu.mkv?dl=0',
        channelName: 'undefined1'
    },
    {
        videoThumbnail: 'thumbnail.jpg',
        videoImg: 'test-img.jpg',
        videoName: 'Basic Syntax In Hindi',
        videoCreator: 'HTML',
        videoLink: 'https://dl.dropboxusercontent.com/s/8uzaub5yp4pys7a/HTML%20Basic%20Syntax%20in%20Hindi%20%20%20Urdu.mkv?dl=0',
        channelName: 'undefined2'
    },
    {
        videoThumbnail: 'thumbnail.jpg',
        videoImg: 'test-img.jpg',
        videoName: 'Basic Syntax Practical In Hindi',
        videoCreator: 'HTML',
        videoLink: 'https://dl.dropboxusercontent.com/s/lmar0th5uci8u2o/HTML%20Basic%20Syntax%20Practical%20in%20Hindi%20%20%20Urdu.mkv?dl=0',
        channelName: 'undefined3'
    },
    {
        videoThumbnail: 'thumbnail.jpg',
        videoImg: 'test-img.jpg',
        videoName: 'Text Fromatting Tags Part-I',
        videoCreator: 'HTML',
        videoLink: 'https://dl.dropboxusercontent.com/s/0fli1vf8vba0ken/HTML%20Text%20Formatting%20Tags%20Tutorial%20in%20Hindi%20%20%20Urdu%20-%20Part%20I.mkv?dl=0',
        channelName: 'undefined4'
    },
    {
        videoThumbnail: 'thumbnail.jpg',
        videoImg: 'test-img.jpg',
        videoName: 'Text Fromatting Tags Part-II',
        videoCreator: 'HTML',
        videoLink: 'https://dl.dropboxusercontent.com/s/yzs97gs4he3v7vt/HTML%20Text%20Formatting%20Tags%20Tutorial%20in%20Hindi%20%20%20Urdu%20-%20Part%20II.mkv?dl=0',
        channelName: 'undefined5'
    },
];

// ================ variables declaration goes here =================== 

// ========================= FORM section ==========================
let usernameInput = document.getElementById('username-input');      // for username input tag 
let passwordInput = document.getElementById('password-input');      // for password input tag
let saveButton = document.getElementById('save-button');            // for save button tag

// ========================= VIDEOS section ==========================
let videosSection = document.getElementById('videos-section');      // for container holding videos 
let videoItem = document.getElementsByClassName('video-item');      // for each video item tag in videos section 

// ========================= player's section ==========================
let isPlay = false;                                                         // for keeping the track if the is being played 
let togglePlay = document.getElementById('toggle-play');                    // for play/pause button 
let togglePlayIcon = document.querySelector('#toggle-play i');              // for targeting the icon of play/pause button
let video = document.getElementById('video-player');                        // for video tag
let videoProgress = document.getElementById('video-progress');              // for video progress bar tag 
let toggleControlsInterval;                                                 // for setinterval event to refernce 
let currentPlayVideo;                                                       // for keeping the track of current playing video
let likedVideosStorage = [];                                                // for storing the liked videos in array
var fullscreenVideo = document.getElementById("controls-up-container");     // for referencing the container keeping the video along with it controls
let fullscreenToggle = document.getElementById('fullscreen-toggle');        // for referencing the icon for fullscreen

// ========================= navbar section ==========================
let navItems = document.getElementsByClassName('nav-item');                 // for referencing the nav items in navbar

// ===================================== function declaration goes here ======================================== 

// ========================= form section ==========================

// for storing username locally
function setUsername(name) {
    localStorage.setItem('USERNAME', name);
}

// getting username function locally
function getUsername() {
    return localStorage.getItem('USERNAME');
}

// for storing password locally
function setPassword(password) {
    localStorage.setItem('PASSWORD', password);
}

// function for checking valid input used in form  
function verifiedInputChecker(input) {
    if (input.value == '') {
        saveButton.classList.add('disabled-link');
    } else {
        for (let i = 0; i < input.value.length; i++) {
            if (input.value[i] != ' ') {
                saveButton.classList.remove('disabled-link');
                return;
            }
        }
        saveButton.classList.add('disabled-link');
    }
}

// username input verification event 
usernameInput.addEventListener('input', () => {
    verifiedInputChecker(usernameInput);
    verifiedInputChecker(passwordInput);
});

// user password verification event 
passwordInput.addEventListener('input', () => {
    verifiedInputChecker(passwordInput);
    verifiedInputChecker(usernameInput);
});

// save button event 
saveButton.addEventListener('click', () => {
    document.getElementById('form').style.top = '-200vh';
    setUsername(usernameInput.value);
    setPassword(passwordInput.value);
    document.getElementById('about-username').innerHTML = getUsername();
});

// ========================= header section ==========================

// to open search section 
document.getElementById('open-search').addEventListener('click', () => {
    document.getElementById('search-container').style.left = '0';
    document.getElementById('search-container').style.display = 'flex';
});

// ========================= VIDEOS section ==========================

// for creating childs in videos section 
function createVideos(num) {
    let parent = videosSection;
    let child = document.createElement('div');
    child.classList.add('video-item');
    child.innerHTML = `
                    <div>
                        <img src="${vidoesStorage[num].videoThumbnail}" alt="${vidoesStorage[num].videoName}" class="video-thumbnail">
                    </div>
                    <div class="video-details">
                        <div class="video-image">
                            <img src="${vidoesStorage[num].videoImg}" alt="${vidoesStorage[num].videoImg}">
                        </div>
                        <div class="video-content">
                            <div class="video-name">${vidoesStorage[num].videoName}</div>
                            <div class="video-creator-name">${vidoesStorage[num].videoCreator}</div>
                        </div>
                    </div>
    `;
    parent.appendChild(child);

    // adding event to child on click 
    child.addEventListener('click', () => {
        document.getElementById('video-player-container').style.top ='0';
        setUpPlayer(vidoesStorage[num]);
        play();
        currentPlayVideo = num;
        isLiked(vidoesStorage[currentPlayVideo]);
        toggleControls('block');
        setTimeout(() => {
            toggleControls('none');
        }, 5000);
    });
}

// creating the videos in home section 
for (let i = 0; i < vidoesStorage.length; i++) {
    createVideos(i);
}

// ========================= about section ==========================

// ============ liked videos section ============ 

// for creating videos in liked section 
function createLikedVideos(num) {
    let parent = document.getElementById('liked-videos');
    let child = document.createElement('div');
    child.classList.add('liked-item');
    child.innerHTML = `
                <div>
                    <img src="${likedVideosStorage[num].videoThumbnail}" alt="${likedVideosStorage[num].videoName}" class="about-video-thumbnail">
                </div>
                <div class="about-video-details">
                    <div class="about-video-name">${likedVideosStorage[num].videoName}</div>
                    <div class="about-video-creator-name">${likedVideosStorage[num].videoCreator}</div>
                </div>
    `;
    parent.appendChild(child);

    // adding click events 
    child.addEventListener('click', () => {
        document.getElementById('video-player-container').style.top ='0';
        setUpPlayer(likedVideosStorage[num]);
        play();
        currentPlayVideo = num;
        isLiked(likedVideosStorage[currentPlayVideo]);
        toggleControls('block');
        setTimeout(() => {
            toggleControls('none');
        }, 5000);
    });
}

// calling create liked videos function 
function callLikedVideosFunction() {
    
    // for reseting the liked videos container before filling 
    document.getElementById('liked-videos').innerHTML = '';
    
    // now calling create liked videos function
    for (let i = 0; i < likedVideosStorage.length; i++) {
        createLikedVideos(i);
    }

    // for checking if the container is empty then show a message 
    if (document.getElementById('liked-videos').innerHTML == '') {
        document.getElementById('liked-videos').innerHTML = `<div class="about-warning">
                                                                You haven't liked any videos :( 
                                                            </div>`;
    }
}

// =============== to delete the account =============== 

// to open the pop up 
document.getElementById('delete-accounts').addEventListener('click', () => {
    document.getElementById('delete-account-container').style.display = 'flex';
    document.getElementById('delete-account-container').style.left = '0';
});

// to close the pop up 
document.getElementById('cancel-delete').addEventListener('click', () => {
    document.getElementById('delete-account-container').style.display = 'none';
    document.getElementById('delete-account-container').style.left = '100vw';
});

// to delete account 
document.getElementById('account-delete').addEventListener('click', () => {
    localStorage.removeItem('LIKEDVIDEOS');
    localStorage.removeItem('USERNAME');
    localStorage.removeItem('PASSWORD');
    location.reload();
})

// ========================= search section ==========================

// to close search section 
document.getElementById('close-search').addEventListener('click', () => {
    document.getElementById('search-container').style.left = '100vw';
    document.getElementById('search-container').style.display = 'none';
});

// for creating the childs for founded items 
function createFoundItem(num) {
    let parent = document.getElementById('searched-item-container');
    let child = document.createElement('div');
    child.classList.add('found-item');
    child.innerHTML = `
                    <div class="found-item-image">
                        <img src="${vidoesStorage[num].videoThumbnail}" alt="${vidoesStorage[num].videoThumbnail}">
                    </div>
                    <div class="found-item-details">
                        <div class="found-item-video-name">${vidoesStorage[num].videoName}</div>
                        <div class="found-item-video-creator">${vidoesStorage[num].videoCreator}</div>
                    </div>
    `;
    parent.appendChild(child);

    // for adding the click events 
    child.addEventListener('click', () => {
        document.getElementById('video-player-container').style.top ='0';
        setUpPlayer(vidoesStorage[num]);
        play();
        currentPlayVideo = num;
        isLiked(vidoesStorage[currentPlayVideo]);
        toggleControls('block');
        setTimeout(() => {
            toggleControls('none');
        }, 5000);
    });
}

// for searching the item according to user given input 
function searchVideo() {
    let searchInput = document.getElementById('input-search');

    // for clearing the searched videos container 
    document.getElementById('searched-item-container').innerHTML = '';
    for (let i = 0; i < vidoesStorage.length; i++) {
        if (
                (vidoesStorage[i].videoName.toUpperCase().indexOf(searchInput.value.toUpperCase()) != -1)
             || (vidoesStorage[i].videoCreator.toUpperCase().indexOf(searchInput.value.toUpperCase()) != -1)
             || (vidoesStorage[i].channelName.toUpperCase().indexOf(searchInput.value.toUpperCase) != -1)
           ) 
        {
            createFoundItem(i);
        }
    }

    // if no videos found show message accordingly 
    if (searchInput.value == '' || document.getElementById('searched-item-container').innerHTML == '') {
        document.getElementById('searched-item-container').innerHTML = '<div style="text-align: center;font-size: 1.5rem;color: red;padding:2rem 0;">No result found :(</div>';
    }

}

// for adding input event to input tag in search header section 
document.getElementById('input-search').addEventListener('input', searchVideo);

// ========================= player's section ==========================

// close button 
document.getElementById('close-video').addEventListener('click', () => {
    if (document.fullscreen) {
        closeFullscreen(); 
    } else {
        pause();
        document.getElementById('video-player-container').style.top ='120vh';
    }
});

// function for setting the player when being called 
function setUpPlayer(obj) {
    video.src = obj.videoLink;
    document.getElementById('video-name').innerHTML = obj.videoName;
    document.getElementById('video-creator-name').innerHTML = obj.videoCreator;
    document.getElementById('channel-img').src = obj.videoImg;
    document.getElementById('channel-name').innerHTML = obj.channelName;
    document.getElementById('download-video').href = obj.videoLink;
}

// function for play the song without getting errors 
function play() {
    var playPromise = video.play();
    isPlay = true;
    togglePlayIcon.classList = 'fa-solid fa-pause';

    if (playPromise !== undefined) {
        playPromise.then(_ => { })
            .catch(error => { });
    }
}

// function for pause the song 
function pause() {
    video.pause();
    togglePlayIcon.classList = 'fa-solid fa-play';
    isPlay = false;
}

// adding event to toggle button 
togglePlay.addEventListener('click', () => {
    if (isPlay) {
        pause();
    } else {
        play();
    }

    // for reseting the timer to hide the controls 
    resetToggle();
});

// function for adding zero 
function addZero(val) {
    if (val < 10) {
        return '0' + val;
    } 
    return val;
}

// timer event adding 
setInterval(() => {
    document.getElementById('timer').innerHTML = `
                                            ${addZero(Math.floor(video.currentTime/60))}:
                                            ${addZero(Math.floor(video.currentTime%60))}/                                           
                                            ${addZero(Math.floor(video.duration/60))}:                                          
                                            ${addZero(Math.floor(video.duration%60))}                                           
                                            `;

    // for changing the value of progress bar 
    videoProgress.value = `${(video.currentTime / video.duration) * 100}`;
}, 1000);

// for changing the progress of the video 
videoProgress.addEventListener('input', () => {
    video.currentTime = `${(videoProgress.value / 100) * video.duration}`;
    resetToggle();
});

// function for full screen video 
function openFullscreen() {
  if (fullscreenVideo.requestFullscreen) {
    fullscreenVideo.requestFullscreen();
  } else if (fullscreenVideo.webkitRequestFullscreen) { /* Safari */
    fullscreenVideo.webkitRequestFullscreen();
  } else if (fullscreenVideo.msRequestFullscreen) { /* IE11 */
    fullscreenVideo.msRequestFullscreen();
  }
}

// function for closing fullscreen video
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
}

// for adding event to fullscreen icon in player's section 
fullscreenToggle.addEventListener('click', () => {
    if (document.querySelector('#fullscreen-toggle > i').classList.contains('fa-expand')) {
        openFullscreen();
    }else{
        closeFullscreen();
    }
});

// adding the event to window to detect when switching between fullscreen and exit fullscreen 
addEventListener("fullscreenchange", () => {
    if (document.fullscreen) {
        document.querySelector('#fullscreen-toggle > i').classList.remove('fa-expand');
        document.querySelector('#fullscreen-toggle > i').classList.add('fa-compress');
    } else {
        document.querySelector('#fullscreen-toggle > i').classList.remove('fa-compress');
        document.querySelector('#fullscreen-toggle > i').classList.add('fa-expand');
    }
})

// to show controls when clicks on the video
video.addEventListener('click', () => {
    toggleControls('block');
    toggleControlsInterval = setTimeout(() => {
        toggleControls('none');
    }, 5000);
});

// function for toggle controls to show/hide controls
function toggleControls(val) {
    let pAbsolute = document.getElementsByClassName('p-absolute');      // for targeting each element in videos section

    for (let i = 0; i < pAbsolute.length; i++) {
        pAbsolute[i].style.display = val;
    }

    document.getElementById('toggle-controls').style.display = val;
}

// function for reseting the toggle 
function resetToggle() {
    clearTimeout(toggleControlsInterval);
    toggleControlsInterval = setTimeout(() => {
        toggleControls('none');
    }, 5000);
}

// event for hiding controls 
document.getElementById('toggle-controls').addEventListener('click', () => {
    toggleControls('none');
    clearTimeout(toggleControlsInterval);
});

// function for next song 
function nextVideo() {
    currentPlayVideo++;
    if (currentPlayVideo == vidoesStorage.length) {
        currentPlayVideo = 0;
    }
    setUpPlayer(vidoesStorage[currentPlayVideo]);
    play();
    resetToggle();
    isLiked(vidoesStorage[currentPlayVideo]);
}

// function for previous video 
function previousVideo() {
    currentPlayVideo--;
    if (currentPlayVideo == -1) {
        currentPlayVideo = vidoesStorage.length - 1;
    }
    setUpPlayer(vidoesStorage[currentPlayVideo]);
    play();
    resetToggle();
    isLiked(vidoesStorage[currentPlayVideo]);
}

// adding event to next button 
document.getElementById('next').addEventListener('click', nextVideo); 

// adding event to prev button 
document.getElementById('prev').addEventListener('click', previousVideo); 

// auto play next song 
video.addEventListener('ended', nextVideo);

// function for storing liked videos locally 
function setLikedVideo() {
    localStorage.setItem('LIKEDVIDEOS', JSON.stringify(likedVideosStorage));
}

// function for getting liked videos 
function getLikedVideo() {
    return JSON.parse(localStorage.getItem('LIKEDVIDEOS'));
}

// function for like the videos 
function isLiked(obj) {
    for (let i = 0; i < likedVideosStorage.length; i++) {
        if (obj.videoLink == likedVideosStorage[i].videoLink) {
            document.querySelector('#like > i').classList.remove('fa-light');
            document.querySelector('#like > i').classList.add('fa-solid');
            return;
        }
    }
    document.querySelector('#like > i').classList.remove('fa-solid');
    document.querySelector('#like > i').classList.add('fa-light');

    callLikedVideosFunction();
}

// for adding video to like section 
function addLikedVideo(obj) {
    if (likedVideosStorage.length == 0) {
        likedVideosStorage[0] = obj;
    }
    else{
        for (let i = likedVideosStorage.length; i > 0; i--) {
            likedVideosStorage[i] = likedVideosStorage[i - 1];
        }
        likedVideosStorage[0] = obj;
    }

    callLikedVideosFunction();

    setLikedVideo();
}

// for removing the videos from liked video section 
function removeLike(obj) {
    if (likedVideosStorage.length == 0) {
        likedVideosStorage.pop();
    }
    else{
        for (let i = 0; i < likedVideosStorage.length; i++) {
            if (obj.videoLink == likedVideosStorage[i].videoLink) {
                for (let j = i; j < likedVideosStorage.length - 1; j++) {
                    likedVideosStorage[j] = likedVideosStorage[j + 1];
                }
                likedVideosStorage.pop();
            }
        }
    }

    callLikedVideosFunction();

    setLikedVideo();
}

// adding event to like and dislike event 
document.getElementById('like').addEventListener('click', () => {
    if (document.querySelector('#like i').classList.contains('fa-light')) {
        addLikedVideo(vidoesStorage[currentPlayVideo]);
        isLiked(vidoesStorage[currentPlayVideo]);
    }
    else{
        removeLike(vidoesStorage[currentPlayVideo]);
        isLiked(vidoesStorage[currentPlayVideo]);
    }
    setLikedVideo();
});

// next videos suggestion 
function createSuggestionVideos(num) {
    let parent = document.getElementById('suggestion-container');
    let child = document.createElement('div');
    child.classList.add('s-video-item');
    child.innerHTML = `
                        <div>
                            <img src="${vidoesStorage[num].videoThumbnail}" alt="${vidoesStorage[num].videoName}" class="s-video-thumbnail">
                        </div>
                        <div class="s-video-details">
                            <div class="s-video-image">
                                <img src="${vidoesStorage[num].videoImg}" alt="${vidoesStorage[num].videoImg}">
                            </div>
                            <div class="s-video-content">
                                <div class="s-video-name">${vidoesStorage[num].videoName}</div>
                                <div class="s-video-creator-name">${vidoesStorage[num].videoCreator}</div>
                            </div>
                        </div>
    `;
    parent.appendChild(child);

    // adding event to child on click 
    child.addEventListener('click', () => {
        setUpPlayer(vidoesStorage[num]);
        play();
        currentPlayVideo = num;
        isLiked(vidoesStorage[currentPlayVideo]);
        toggleControls('block');
        setTimeout(() => {
            toggleControls('none');
        }, 5000);
    });
}

// calling create suggestion videos 
for (let i = 0; i < vidoesStorage.length; i++) {
    createSuggestionVideos(i);
}

// =================== navbar section ======================

navItems[0].addEventListener('click', () => {
    document.getElementById('videos-section').scrollIntoView();
});

navItems[1].addEventListener('click', () => {
    document.getElementById('about-section').scrollIntoView();
});



// =================== window onload event listener ===============
addEventListener('load', () => {
    
    // =========================== loading section ==========================
    // hiding the loading container 
    document.getElementById('loading-container').classList.add('hide-loader');
    
    // =========================== FORM section ==========================

    // in case user is already loged in 
    if (getUsername() != null) {
        document.getElementById('form').style.top = '-200vh';
        document.getElementById('about-username').innerHTML = getUsername();
    }

    // to getting liked videos from localStorage if it is there 
    if (getLikedVideo() != null) {
        likedVideosStorage = getLikedVideo();
        callLikedVideosFunction();
    }

});
