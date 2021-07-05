import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { agencyTheme } from 'common/theme/agency';
import { ResetCSS } from 'common/assets/css/style';

export default () => {
  return (
    <ThemeProvider theme={agencyTheme}>
      <Fragment>
        <ResetCSS />
        {/* End of agency head section */}

        {/* Start agency wrapper section */}
        <div id="flaticonExample">
          <header>
            <a href="https://www.flaticon.com" target="_blank" className="logo">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 560.875 102.036"
              >
                <defs />
                <g>
                  <g className="letters">
                    <path
                      fill="#ffffff"
                      d="M141.596,29.675c0-3.777,2.985-6.767,6.764-6.767h34.438c3.426,0,6.15,2.728,6.15,6.15
                        c0,3.43-2.724,6.149-6.15,6.149h-27.674v13.091h23.719c3.429,0,6.151,2.724,6.151,6.15c0,3.43-2.723,6.149-6.151,6.149h-23.719
                        v17.574c0,3.773-2.986,6.761-6.764,6.761c-3.779,0-6.764-2.989-6.764-6.761V29.675z"
                    />
                    <path
                      fill="#ffffff"
                      d="M193.844,29.149c0-3.781,2.985-6.767,6.764-6.767c3.776,0,6.763,2.985,6.763,6.767v42.957h25.039
                        c3.426,0,6.149,2.726,6.149,6.153c0,3.425-2.723,6.15-6.149,6.15h-31.802c-3.779,0-6.764-2.986-6.764-6.768V29.149z"
                    />
                    <path
                      fill="#ffffff"
                      d="M241.891,75.71l21.438-48.407c1.492-3.341,4.215-5.357,7.906-5.357h0.792
                        c3.686,0,6.323,2.017,7.815,5.357l21.439,48.407c0.436,0.967,0.701,1.845,0.701,2.723c0,3.602-2.809,6.501-6.414,6.501
                        c-3.161,0-5.269-1.845-6.499-4.655l-4.132-9.661h-27.059l-4.301,10.102c-1.144,2.631-3.426,4.214-6.237,4.214
                        c-3.517,0-6.24-2.81-6.24-6.325C241.1,77.64,241.451,76.677,241.891,75.71z M279.932,58.666l-8.521-20.297l-8.526,20.297H279.932
                        z"
                    />
                    <path
                      fill="#ffffff"
                      d="M314.864,35.387H301.86c-3.429,0-6.239-2.813-6.239-6.238c0-3.429,2.811-6.24,6.239-6.24h39.533
                        c3.426,0,6.237,2.811,6.237,6.24c0,3.425-2.811,6.238-6.237,6.238h-13.001v42.785c0,3.773-2.99,6.761-6.764,6.761
                        c-3.779,0-6.764-2.989-6.764-6.761V35.387z"
                    />
                    <path
                      fill="#A9FD00"
                      d="M352.615,29.149c0-3.781,2.985-6.767,6.767-6.767c3.774,0,6.761,2.985,6.761,6.767v49.024
                        c0,3.773-2.987,6.761-6.761,6.761c-3.781,0-6.767-2.989-6.767-6.761V29.149z"
                    />
                    <path
                      fill="#A9FD00"
                      d="M374.132,53.836v-0.179c0-17.481,13.178-31.801,32.065-31.801c9.22,0,15.459,2.458,20.557,6.238
                        c1.402,1.054,2.637,2.985,2.637,5.357c0,3.692-2.985,6.59-6.681,6.59c-1.845,0-3.071-0.702-4.044-1.319
                        c-3.776-2.813-7.729-4.393-12.562-4.393c-10.364,0-17.831,8.611-17.831,19.154v0.173c0,10.542,7.291,19.329,17.831,19.329
                        c5.715,0,9.492-1.756,13.359-4.834c1.049-0.874,2.458-1.491,4.039-1.491c3.429,0,6.325,2.813,6.325,6.236
                        c0,2.106-1.056,3.78-2.282,4.834c-5.539,4.834-12.036,7.733-21.878,7.733C387.572,85.464,374.132,71.493,374.132,53.836z"
                    />
                    <path
                      fill="#A9FD00"
                      d="M433.009,53.836v-0.179c0-17.481,13.79-31.801,32.766-31.801c18.981,0,32.592,14.143,32.592,31.628v0.173
                        c0,17.483-13.785,31.807-32.769,31.807C446.625,85.464,433.009,71.32,433.009,53.836z M484.224,53.836v-0.179
                        c0-10.539-7.725-19.326-18.626-19.326c-10.893,0-18.449,8.611-18.449,19.154v0.173c0,10.542,7.73,19.329,18.626,19.329
                        C476.676,72.986,484.224,64.378,484.224,53.836z"
                    />
                    <path
                      fill="#A9FD00"
                      d="M506.233,29.321c0-3.774,2.99-6.763,6.767-6.763h1.401c3.252,0,5.183,1.583,7.029,3.953l26.093,34.265
                        V29.059c0-3.692,2.99-6.677,6.681-6.677c3.683,0,6.671,2.985,6.671,6.677v48.934c0,3.78-2.987,6.765-6.764,6.765h-0.436
                        c-3.257,0-5.188-1.581-7.034-3.953l-27.056-35.492v32.944c0,3.687-2.985,6.676-6.678,6.676c-3.683,0-6.673-2.989-6.673-6.676
                        V29.321z"
                    />
                  </g>
                  <g className="insignia">
                    <path
                      fill="#ffffff"
                      d="M48.372,56.137h12.517l11.156-18.537H37.186L25.688,18.539h57.825L94.668,0H9.271
                        C5.925,0,2.842,1.801,1.198,4.716c-1.644,2.907-1.593,6.482,0.134,9.343l50.38,83.501c1.678,2.781,4.689,4.476,7.938,4.476
                        c3.246,0,6.257-1.695,7.935-4.476l2.898-4.804L48.372,56.137z"
                    />
                    <g className="i">
                      <path
                        fill="#A9FD00"
                        d="M93.575,18.539h0.031v0.004l21.652,0.004l2.705-4.488c1.727-2.861,1.778-6.436,0.133-9.343
                            C116.454,1.801,113.371,0,110.026,0h-5.294L93.575,18.539z"
                      />
                      <polygon
                        fill="#A9FD00"
                        points="88.291,27.356 64.725,66.486 75.519,84.404 109.942,27.356"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </a>
          </header>

          <section id="glyphs">
            <div className="glyph">
              <div className="glyph-icon flaticon-flask" />
              <div className="class-name">.flaticon-flask</div>
              <div className="author-name">
                Author:
                <a data-file="001-flask" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-pencil-case" />
              <div className="class-name">.flaticon-pencil-case</div>
              <div className="author-name">
                Author:
                <a data-file="002-pencil-case" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-ruler" />
              <div className="class-name">.flaticon-ruler</div>
              <div className="author-name">
                Author:
                <a data-file="003-ruler" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-startup" />
              <div className="class-name">.flaticon-startup</div>
              <div className="author-name">
                Author:
                <a data-file="004-startup" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-creative" />
              <div className="class-name">.flaticon-creative</div>
              <div className="author-name">
                Author:
                <a
                  data-file="005-creative"
                  href="https://www.flaticon.com/authors/good-ware"
                >
                  Good Ware
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-briefing" />
              <div className="class-name">.flaticon-briefing</div>
              <div className="author-name">
                Author:
                <a data-file="006-briefing" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-magnifying-glass" />
              <div className="class-name">.flaticon-magnifying-glass</div>
              <div className="author-name">
                Author:
                <a
                  data-file="007-magnifying-glass"
                  href="https://www.flaticon.com/authors/gregor-cresnar"
                >
                  Gregor Cresnar
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-user" />
              <div className="class-name">.flaticon-user</div>
              <div className="author-name">
                Author:
                <a data-file="008-user" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-quotes" />
              <div className="class-name">.flaticon-quotes</div>
              <div className="author-name">
                Author:
                <a
                  data-file="009-quotes"
                  href="https://www.flaticon.com/authors/icomoon"
                >
                  Icomoon
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-next" />
              <div className="class-name">.flaticon-next</div>
              <div className="author-name">
                Author:
                <a
                  data-file="010-next"
                  href="https://www.flaticon.com/authors/lyolya"
                >
                  Lyolya
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-left-arrow" />
              <div className="class-name">.flaticon-left-arrow</div>
              <div className="author-name">
                Author:
                <a
                  data-file="011-left-arrow"
                  href="https://www.flaticon.com/authors/lyolya"
                >
                  Lyolya
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-plus-symbol" />
              <div className="class-name">.flaticon-plus-symbol</div>
              <div className="author-name">
                Author:
                <a
                  data-file="012-plus-symbol"
                  href="https://www.flaticon.com/authors/lyolya"
                >
                  Lyolya
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-minus-symbol" />
              <div className="class-name">.flaticon-minus-symbol</div>
              <div className="author-name">
                Author:
                <a
                  data-file="013-minus-symbol"
                  href="https://www.flaticon.com/authors/lyolya"
                >
                  Lyolya
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-trophy" />
              <div className="class-name">.flaticon-trophy</div>
              <div className="author-name">
                Author:
                <a
                  data-file="014-trophy"
                  href="https://www.flaticon.com/authors/dinosoftlabs"
                >
                  DinosoftLabs
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-conversation" />
              <div className="class-name">.flaticon-conversation</div>
              <div className="author-name">
                Author:
                <a data-file="015-conversation" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-atom" />
              <div className="class-name">.flaticon-atom</div>
              <div className="author-name">
                Author:
                <a
                  data-file="016-atom"
                  href="https://www.flaticon.com/authors/kiranshastry"
                >
                  Kiranshastry
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-link" />
              <div className="class-name">.flaticon-link</div>
              <div className="author-name">
                Author:
                <a
                  data-file="017-link"
                  href="https://www.flaticon.com/authors/smashicons"
                >
                  Smashicons
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-battery" />
              <div className="class-name">.flaticon-battery</div>
              <div className="author-name">
                Author:
                <a
                  data-file="018-battery"
                  href="https://www.flaticon.com/authors/smashicons"
                >
                  Smashicons
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-stopwatch" />
              <div className="class-name">.flaticon-stopwatch</div>
              <div className="author-name">
                Author:
                <a
                  data-file="019-stopwatch"
                  href="https://www.flaticon.com/authors/smashicons"
                >
                  Smashicons
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-stopwatch-1" />
              <div className="class-name">.flaticon-stopwatch-1</div>
              <div className="author-name">
                Author:
                <a
                  data-file="020-stopwatch-1"
                  href="https://www.flaticon.com/authors/smashicons"
                >
                  Smashicons
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-objective" />
              <div className="class-name">.flaticon-objective</div>
              <div className="author-name">
                Author:
                <a
                  data-file="021-objective"
                  href="https://www.flaticon.com/authors/good-ware"
                >
                  Good Ware
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-facebook-logo" />
              <div className="class-name">.flaticon-facebook-logo</div>
              <div className="author-name">
                Author:
                <a data-file="022-facebook-logo" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-twitter-logo-silhouette" />
              <div className="class-name">
                .flaticon-twitter-logo-silhouette
              </div>
              <div className="author-name">
                Author:
                <a
                  data-file="023-twitter-logo-silhouette"
                  href="https://www.flaticon.com/authors/elegant-themes"
                >
                  Elegant Themes
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-instagram" />
              <div className="class-name">.flaticon-instagram</div>
              <div className="author-name">
                Author:
                <a data-file="024-instagram" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-dribble-logo" />
              <div className="class-name">.flaticon-dribble-logo</div>
              <div className="author-name">
                Author:
                <a
                  data-file="025-dribble-logo"
                  href="https://www.flaticon.com/authors/daniel-bruce"
                >
                  Daniel Bruce
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-tumblr-logo" />
              <div className="class-name">.flaticon-tumblr-logo</div>
              <div className="author-name">
                Author:
                <a
                  data-file="026-tumblr-logo"
                  href="https://www.flaticon.com/authors/dave-gandy"
                >
                  Dave Gandy
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-youtube" />
              <div className="class-name">.flaticon-youtube</div>
              <div className="author-name">
                Author:
                <a
                  data-file="027-youtube"
                  href="https://www.flaticon.com/authors/pixel-perfect"
                >
                  Pixel perfect
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-google-plus" />
              <div className="class-name">.flaticon-google-plus</div>
              <div className="author-name">
                Author:
                <a
                  data-file="028-google-plus"
                  href="https://www.flaticon.com/authors/hanan"
                >
                  Hanan
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-blockchain" />
              <div className="class-name">.flaticon-blockchain</div>
              <div className="author-name">
                Author:
                <a
                  data-file="029-blockchain"
                  href="https://www.flaticon.com/authors/srip"
                >
                  srip
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-money-bag" />
              <div className="class-name">.flaticon-money-bag</div>
              <div className="author-name">
                Author:
                <a
                  data-file="030-money-bag"
                  href="https://www.flaticon.com/authors/gregor-cresnar"
                >
                  Gregor Cresnar
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-wallet" />
              <div className="class-name">.flaticon-wallet</div>
              <div className="author-name">
                Author:
                <a
                  data-file="031-wallet"
                  href="https://www.flaticon.com/authors/epiccoders"
                >
                  EpicCoders
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-security" />
              <div className="class-name">.flaticon-security</div>
              <div className="author-name">
                Author:
                <a data-file="032-security" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-bitcoin" />
              <div className="class-name">.flaticon-bitcoin</div>
              <div className="author-name">
                Author:
                <a
                  data-file="033-bitcoin"
                  href="https://www.flaticon.com/authors/srip"
                >
                  srip
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-blockchain-1" />
              <div className="class-name">.flaticon-blockchain-1</div>
              <div className="author-name">
                Author:
                <a
                  data-file="034-blockchain-1"
                  href="https://www.flaticon.com/authors/nikita-golubev"
                >
                  Nikita Golubev
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-annonymous" />
              <div className="class-name">.flaticon-annonymous</div>
              <div className="author-name">
                Author:
                <a data-file="035-annonymous" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-group" />
              <div className="class-name">.flaticon-group</div>
              <div className="author-name">
                Author:
                <a
                  data-file="036-group"
                  href="https://www.flaticon.com/authors/prosymbols"
                >
                  Prosymbols
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-prototype" />
              <div className="class-name">.flaticon-prototype</div>
              <div className="author-name">
                Author:
                <a data-file="037-prototype" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-code" />
              <div className="class-name">.flaticon-code</div>
              <div className="author-name">
                Author:
                <a
                  data-file="038-code"
                  href="https://www.flaticon.com/authors/dave-gandy"
                >
                  Dave Gandy
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-vectors" />
              <div className="class-name">.flaticon-vectors</div>
              <div className="author-name">
                Author:
                <a data-file="039-vectors" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-export" />
              <div className="class-name">.flaticon-export</div>
              <div className="author-name">
                Author:
                <a
                  data-file="040-export"
                  href="https://www.flaticon.com/authors/gregor-cresnar"
                >
                  Gregor Cresnar
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-hourglass" />
              <div className="class-name">.flaticon-hourglass</div>
              <div className="author-name">
                Author:
                <a
                  data-file="041-hourglass"
                  href="https://www.flaticon.com/authors/smashicons"
                >
                  Smashicons
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-trophy-1" />
              <div className="class-name">.flaticon-trophy-1</div>
              <div className="author-name">
                Author:
                <a data-file="042-trophy-1" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-upload" />
              <div className="class-name">.flaticon-upload</div>
              <div className="author-name">
                Author:
                <a
                  data-file="043-upload"
                  href="https://www.flaticon.com/authors/gregor-cresnar"
                >
                  Gregor Cresnar
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-settings" />
              <div className="class-name">.flaticon-settings</div>
              <div className="author-name">
                Author:
                <a
                  data-file="044-settings"
                  href="https://www.flaticon.com/authors/gregor-cresnar"
                >
                  Gregor Cresnar
                </a>
              </div>
            </div>

            <div className="glyph">
              <div className="glyph-icon flaticon-strategy" />
              <div className="class-name">.flaticon-strategy</div>
              <div className="author-name">
                Author:
                <a data-file="045-strategy" href="http://www.freepik.com">
                  Freepik
                </a>
              </div>
            </div>
          </section>

          <section className="iconsuse">
            <div>
              <div className="title">Examples:</div>

              <div className="image">
                <p>
                  <i className="glyph-icon flaticon-flask" />
                  <span>
                    &lt;i className=&quot;flaticon-flask&quot;&gt;&lt;/i&gt;
                  </span>
                </p>
              </div>

              <div className="image">
                <p>
                  <i className="glyph-icon flaticon-pencil-case" />
                  <span>
                    &lt;i
                    className=&quot;flaticon-pencil-case&quot;&gt;&lt;/i&gt;
                  </span>
                </p>
              </div>

              <div className="image">
                <p>
                  <i className="glyph-icon flaticon-ruler" />
                  <span>
                    &lt;i className=&quot;flaticon-ruler&quot;&gt;&lt;/i&gt;
                  </span>
                </p>
              </div>

              <div className="image">
                <p>
                  <i className="glyph-icon flaticon-startup" />
                  <span>
                    &lt;i className=&quot;flaticon-startup&quot;&gt;&lt;/i&gt;
                  </span>
                </p>
              </div>
            </div>
          </section>
        </div>
        {/* End of agency wrapper section */}
      </Fragment>
    </ThemeProvider>
  );
};
