import { convert, setupListeners, loadCurrencies } from './convert.js';

window.addEventListener('DOMContentLoaded', () => {
    setupListeners()
    loadCurrencies()
})