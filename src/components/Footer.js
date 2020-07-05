import React from 'react'
// import InstagramFeed from './InstagramFeed'
import './Footer.css'

import SetLanguageCart from './SetLanguageCart'

export default () => (
  <div>
    {/* <h2 className="taCenter">
      Follow us{' '}
      <a href="https://instagram.com/thrivegoldcoast/">@thrivegoldcoast</a>
    </h2> */}
    <br />
    {/* <InstagramFeed count="8" /> */}
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} Todos los derechos reservados. Creado con ❤️ por {' '}
          <a href="https://thriveweb.com.au/">Placeholder y Thrive</a>.
        </span>
      <SetLanguageCart></SetLanguageCart>
      </div>
    </footer>
  </div>
)
