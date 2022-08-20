const toggler = document.querySelector('.toggler');
const slider = document.querySelector('.toggler-slider');

const body = document.querySelector('body');
const headerContainer = document.querySelector('.header-container');
const togglerTrack = document.querySelector('.toggler-track');
const togglerSlider = document.querySelector('.toggler-slider');
const inputResultContainer = document.querySelector('.input-result-container');
export const buttonsContainer = document.querySelector('.buttons-container');
export const del = document.querySelector('.del');
export const reset = document.querySelector('.reset');
export const equal = document.querySelector('.equal');

const themes = {
  theme1: 1,
  theme2: 2,
  theme3: 3,
};

toggler.addEventListener('click', function (e) {
  if (!e.target.classList.contains('theme')) return;

  if (e.target.textContent == themes.theme2) {
    slider.classList.add(`theme-2`);
    slider.classList.remove('theme-3');
    slider.classList.remove('theme-1');

    changeTheme(themes.theme1, themes.theme3, themes.theme2);
  }

  if (e.target.textContent == themes.theme3) {
    slider.classList.add('theme-3');
    slider.classList.remove('theme-2');
    slider.classList.remove('theme-1');

    changeTheme(themes.theme2, themes.theme1, themes.theme3);
  }

  if (e.target.textContent == themes.theme1) {
    slider.classList.add('theme-1');
    slider.classList.remove('theme-2');
    slider.classList.remove('theme-3');

    changeTheme(themes.theme3, themes.theme2, themes.theme1);
  }
});

function changeTheme(fromState1, fromState2, toState) {
  body.classList.add(`theme-${toState}-background`);
  body.classList.remove(`theme-${fromState1}-background`);
  body.classList.remove(`theme-${fromState2}-background`);

  headerContainer.classList.add(`theme-${toState}-color`);
  headerContainer.classList.remove(`theme-${fromState1}-color`);
  headerContainer.classList.remove(`theme-${fromState2}-color`);

  togglerTrack.classList.add(`theme-${toState}-toggler-track`);
  togglerTrack.classList.remove(`theme-${fromState1}-toggler-track`);
  togglerTrack.classList.remove(`theme-${fromState2}-toggler-track`);

  togglerSlider.classList.add(`theme-${toState}-slider`);
  togglerSlider.classList.remove(`theme-${fromState1}-slider`);
  togglerSlider.classList.remove(`theme-${fromState2}-slider`);

  inputResultContainer.classList.add(`theme-${toState}-input-result-container`);
  inputResultContainer.classList.remove(
    `theme-${fromState1}-input-result-container`
  );
  inputResultContainer.classList.remove(
    `theme-${fromState2}-input-result-container`
  );

  buttonsContainer.classList.add(`theme-${toState}-buttons-container`);
  buttonsContainer.classList.remove(`theme-${fromState1}-buttons-container`);
  buttonsContainer.classList.remove(`theme-${fromState2}-buttons-container`);

  del.classList.add(`theme-${toState}-del`);
  del.classList.remove(`theme-${fromState1}-del`);
  del.classList.remove(`theme-${fromState2}-del`);

  reset.classList.add(`theme-${toState}-reset`);
  reset.classList.remove(`theme-${fromState1}-reset`);
  reset.classList.remove(`theme-${fromState2}-reset`);

  equal.classList.add(`theme-${toState}-equal`);
  equal.classList.remove(`theme-${fromState1}-equal`);
  equal.classList.remove(`theme-${fromState2}-equal`);
}
