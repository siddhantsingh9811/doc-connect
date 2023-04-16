module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/appointmentstoday',
            handler: 'appointment.customAction',
            config: {
                auth: false,
            }
        }
    ]
}