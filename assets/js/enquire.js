(function(){
  // define css selector classes
  const classes = {
    enquire: 'enquire_btn',
    lightbox: 'lightbox',
    form: 'lightbox_form',
    title: 'detail_caption_title',
    subject: 'input_subject',
    close_btn : 'close_btn'
  }
  
   // get nodes based off above css selector classes
  const elements = {
    enquire: document.getElementsByClassName(classes.enquire)[0],
    lightbox: document.getElementsByClassName(classes.lightbox)[0],
    form: document.getElementsByClassName(classes.form)[0],
    title: document.getElementsByClassName(classes.title)[0],
    subject: document.getElementsByClassName(classes.subject)[0],
    close_btn: document.getElementsByClassName(classes.close_btn)[0],
  }
  
  // add event listener to enquire button, open lightbox on click
  elements.enquire.addEventListener('click', function(e){
    elements.lightbox.style.visibility = 'visible';
    elements.lightbox.style.opacity = 1;
    
    //copy text from title element into the subject line of the form
    elements.subject.value = 'Enquiry - ' + elements.title.innerText;
  });
  
  // add event listener to lightbox container to close on click
  elements.lightbox.addEventListener('click', function(e){
    // check that the click isn't on a child element (the form)
    if(e.target !== e.currentTarget) return;
    
    elements.lightbox.style.visibility = 'hidden';
    elements.lightbox.style.opacity = 0;
  });
  
  // add event listener to close button to hide lightbox 
  elements.close_btn.addEventListener('click', function(e){
    
    elements.lightbox.style.visibility = 'hidden';
    elements.lightbox.style.opacity = 0;
  });
 
 
 
})();