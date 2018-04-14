($ => {
  const hello = 'Hello Babel!'

  $(document).ready(() => {
    console.log(hello)
  })
})(JQuery)

if (window.env !== 'development') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('offline worker registered!')
      })
  }
}
