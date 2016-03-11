import jails from 'jails'
import logger from 'mods/logger/logger'
import script from 'scriptjs/dist/script'
import adapter from 'mods/jquery.adapter/jquery.adapter'

script([
    '//code.jquery.com/jquery-1.11.0.min.js'
], function(){

    jails.events = adapter( jQuery )
    logger()
    jails.start()
})
