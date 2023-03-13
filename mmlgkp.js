const songDeleteLinks = document.querySelectorAll('a[href*="song_delete"]');
songDeleteLinks.forEach(link => {
  link.remove();
});

// Array to hold all the mp3 links
const mp3Links = [];

// get all the td elements with class playlistDownloadSong
const downloadButtons = document.querySelectorAll('td.playlistDownloadSong a');

// loop through each download button
downloadButtons.forEach(button => {
  // get the href attribute of the download button
  const href = button.getAttribute('href');

  // create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // set the response type to document
  xhr.responseType = 'document';

  // open the request for the href URL
  xhr.open('GET', href, true);

  // when the request loads
  xhr.onload = () => {
    // get all the links on the loaded page
    const links = xhr.response.querySelectorAll('a[href$=".mp3"]');

    // loop through each link and add to the mp3Links array
    links.forEach(link => {
      const url = link.getAttribute('href');
      mp3Links.push(url);
    });

    // If this is the last request to load, copy the links to clipboard and print to console
    if (mp3Links.length === downloadButtons.length) {
      const linksString = mp3Links.join('
');
      const tempInput = document.createElement('textarea');
      tempInput.value = linksString;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      console.log('Links copied to clipboard:');
      console.log(linksString);
    }
  };

  // send the request
  xhr.send();
});
