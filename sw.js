/*
COPYRIGHT © 2024 Fabio Pollini a.k.a. FopenP <f.open.p@gmail.com> and contributors (see CONTRIBUTORS.md)

The MIT License
---------------

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
*/

const PATH="/instrument-tool-pwa";
const CACHE_VERSION="v0.0.2";
const CACHE_NAME=`instrument-tool-pwa-${CACHE_VERSION}`;

const URLS = [
    `${PATH}`,
    `${PATH}/`,
    `${PATH}/index.html`,
    `${PATH}/index.js`,
    `${PATH}/index.css`,
    `${PATH}/i18n.js`,
    `${PATH}/version.js`,
    `${PATH}/credits/credits.en.html`,
    `${PATH}/credits/credits.it.html`,
    `${PATH}/assets/i/bass-jb8.jpg`,
    `${PATH}/assets/i/piano-bass.jpg`,
    `${PATH}/assets/s/jb8/001-e1.mp3`,
    `${PATH}/assets/s/jb8/013-e2.mp3`,
    `${PATH}/assets/s/jb8/026-a1.mp3`,
    `${PATH}/assets/s/jb8/038-a2.mp3`,
    `${PATH}/assets/s/jb8/051-d2.mp3`,
    `${PATH}/assets/s/jb8/063-d3.mp3`,
    `${PATH}/assets/s/jb8/076-g2.mp3`,
    `${PATH}/assets/s/jb8/088-g3.mp3`,
    `${PATH}/icons/icon.svg`,
    `${PATH}/icons/icon-512.png`,
    `${PATH}/icons/icon-256.png`,
    `${PATH}/icons/icon-180.png`,
    `${PATH}/icons/icon-152.png`,
    `${PATH}/icons/icon-128.png`,
    `${PATH}/icons/icon-120.png`,
    `${PATH}/icons/icon-76.png`,
    `${PATH}/icons/icon-64.png`,
    `${PATH}/icons/icon-60.png`,
    `${PATH}/icons/icon-48.png`,
    `${PATH}/manifest.json`
];

self.addEventListener("install", (ev) => {
    ev.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            cache.addAll(URLS);
        })()
    );
});

self.addEventListener("activate", (ev) => {
    ev.waitUntil(
        (async () => {
            const names = await caches.keys();
            await Promise.all(
                names.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
            await clients.claim();
        })()
    );
});

self.addEventListener("fetch", (ev) => {
    if (ev.request.mode === "navigate") {
        ev.respondWith(caches.match(`${PATH}/`));
        return;
    }

    ev.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(ev.request.url);
            if (cachedResponse) {
                return cachedResponse;
            }
            return new Response(null, { status: 404 });
        })()
    );
});
