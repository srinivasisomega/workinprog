document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const mainWin = window.opener;

    video.addEventListener('ended', function () {
        // Send message to main window when video ends
        mainWin.postMessage('videoEnded', '*');
    });
});
