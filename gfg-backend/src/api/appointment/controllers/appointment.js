'use strict';

/**
 * appointment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::appointment.appointment',({strapi}) =>({
    async customAction(ctx){
        try{
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            let date = `${yyyy}-${mm}-${dd}`
            console.log(date);
            const appointments = await strapi.db.query("api::appointment.appointment").findMany({
                where:{date:date},
                populate:['patient'],
            });

            ctx.body = appointments;
            
        }
        catch(err){
            ctx.body = err;
        }
    }
}));
