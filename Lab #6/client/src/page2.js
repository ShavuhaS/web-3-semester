const collapsibleInstances = {}

class Collapsible {
  static getOrCreate (element) {
    const id = element.dataset.collapsibleId;
    if (id in collapsibleInstances) {
      return collapsibleInstances[id];
    }
    return collapsibleInstances[id] = new Collapsible(element);
  }

  constructor (element) {
    this._element = element;
    this._isTransitioning = false;
  }

  show () {
    if (this.isShown() || this._isTransitioning) {
      return;
    }

    this._element.classList.remove('collapse');
    this._element.classList.add('collapsing');
    this._isTransitioning = true;

    const onComplete = () => {
      this._element.classList.remove('collapsing');
      this._element.classList.add('collapse', 'show');
      this._element.style.height = '';
      this._isTransitioning = false;
    }
    afterAnimation(onComplete, this._element);
    this._element.style.height = `${this._element.scrollHeight}px`;
  }

  hide () {
    if (!this.isShown() || this._isTransitioning) {
      return;
    }
  }

  isShown () {
    return this._element.classList.contains('show');
  }

  toggle () {
    if (this.isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }
}

function afterAnimation (callbackFn, element) {
  const transitionDuration = getTransitionDuration(element);

  let called = false;
  element.addEventListener('transitionend', (event) => {
    if (event.target !== element) {
      return;
    }

    called = true;
    element.removeEventListener('transitionend');
    callbackFn();
  })

  setTimeout(() => {
    if (!called) callbackFn();
  }, transitionDuration);
}

function getTransitionDuration (element) {
  let { transitionDuration, transitionDelay } = window.getComputedStyle(element);

  const numTransitionDuration = Number.parseFloat(transitionDuration.split(',')[0]);
  const numTransitionDelay = Number.parseFloat(transitionDelay.split(',')[0]);

  if (!numTransitionDuration && !numTransitionDelay) {
    return 0;
  }

  return (numTransitionDuration + numTransitionDelay) * 1000;
}

function addCollapseListener (id) {
  const collapsibleSelector = `.collapse-group-${id}`;
  const collapsibles = document.querySelectorAll(collapsibleSelector);
  const button = document.querySelector(`#button-collapse-${id}`);
  button.addEventListener('click', () => {
    collapsibles.forEach( (collapsible) => {
      Collapsible.getOrCreate(collapsible).toggle();
    })
  });
}