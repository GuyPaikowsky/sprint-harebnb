function on(eventName, listener) {
  const callListener = ({detail}) => {
    listener(detail)
  }
  window.addEventListener(eventName, callListener)
  return () => {
    window.removeEventListener(eventName, callListener)
  }
}

function emit(eventName, data) {
  window.dispatchEvent(new CustomEvent(eventName, {detail: data}))
}

let timeoutId = null

export function showUserMsg(msg) {
  if (timeoutId) clearTimeout(timeoutId)

  eventBusService.emit('show-msg', msg)

  timeoutId = setTimeout(() => {
    eventBusService.emit('show-msg', { txt: '', type: '' })
  }, 3000)
}

export function showSuccessMsg(txt) {
  showUserMsg({txt, type: 'success'})
}

export function showErrorMsg(txt) {
  showUserMsg({txt, type: 'error'})
}

export const eventBusService = {on, emit}