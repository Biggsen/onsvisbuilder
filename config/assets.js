const assets = {}

assets.simplemap = {
    css: [
        { link: 'common/css/mapbox-gl.css' },
        { link: 'common/css/chosen.css' },
        { link: 'simplemap/css/styles.css' }
    ],
    js: [
        { link: 'https://cdn.ons.gov.uk/vendor/d3/4.2.7/d3.min.js' },
        { link: 'common/js/modernizr.min.js' },
        { link: 'common/js/d3-queue.min.js' },
        { link: 'https://code.jquery.com/jquery-3.0.0.slim.min.js' },
        { link: 'common/js/chosen.jquery.js' },
        { link: 'https://cdn.ons.gov.uk/vendor/pym/1.3.2/pym.min.js' },
        { link: 'simplemap/js/main.js' }
    ]
}

assets.changeovertime = {
    css: [
        { link: 'common/css/mapbox-gl.css' },
        { link: 'common/css/chosen.css' },
        { link: 'changeovertime/css/styles.css' }
    ],
    js: [
        { link: 'https://cdn.ons.gov.uk/vendor/d3/4.2.7/d3.min.js' },
        { link: 'common/js/modernizr.min.js' },
        { link: 'common/js/d3-queue.min.js' },
        { link: 'https://cdn.ons.gov.uk/vendor/jquery/2.1.4/jquery.min.js' },
        { link: 'common/js/chosen.jquery.js' },
        { link: 'https://cdn.ons.gov.uk/vendor/pym/1.3.2/pym.min.js' },
        { link: 'changeovertime/js/main.js' }
    ]
}

module.exports = assets;
