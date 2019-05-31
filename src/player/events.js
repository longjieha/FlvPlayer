export default function events(flv, player) {
    const {
        options: { poster },
        events: { proxy },
    } = flv;

    player.autoSize();

    flv.on('scripMeta', scripMeta => {
        const { width, height } = scripMeta.amf2.metaData;
        player.$canvas.width = width;
        player.$canvas.height = height;
        player.autoSize();
    });

    flv.on('resize', () => {
        player.autoSize();
    });

    proxy(player.$canvas, 'click', () => {
        if (player.playing) {
            player.pause();
        } else {
            player.play();
        }
    });

    if (poster) {
        flv.on('play', () => {
            player.$poster.style.display = 'none';
        });
    }

    flv.on('waiting', () => {
        player.loading = true;
    });

    flv.on('ended', () => {
        player.loading = false;
    });

    flv.on('timeupdate', () => {
        player.loading = false;
    });
}
