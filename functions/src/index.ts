import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export const pushNotification = functions.https.onRequest((request, response) => {

    response.set('Access-Control-Allow-Origin', "*");
    response.set('Access-Control-Allow-Methods', 'GET, POST');

    const token = request.query.token;
    const topico = request.query.topico;

    console.log('Push notification event triggered', topico);

    let payload: any = {};

    if (topico === 'pedido-entregado') {
        payload = {
            notification: {
                title: 'Pedido completado',
                body: 'Gracias por usar nuestro servicio!',
                sound: 'default',
                priority: "high",
                icon: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1574525021/tools/Moviapp_icono_512x512.png'
            }
        }
    }

    if (topico === 'nuevo-pedido') {
        payload = {
            notification: {
                title: 'Nuevo pedido!!',
                body: 'Tienes pocos segundos para aceptar!',
                sound: 'default',
                priority: "high",
                icon: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1574525021/tools/Moviapp_icono_512x512.png'
            }
        }
    }

    if (topico === 'confirmacion-pedido') {
        payload = {
            notification: {
                title: 'El cliente ha confirmado',
                body: 'Ya puedes comenzar!',
                sound: 'default',
                priority: "high",
                icon: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1574525021/tools/Moviapp_icono_512x512.png'
            }
        }
    }

    if (topico === 'he-llegado') {
        payload = {
            notification: {
                title: 'Tu Rider ha llegado!',
                body: 'Ve al punto de partida',
                sound: 'default',
                priority: "high",
                // click_action:"FCM_PLUGIN_ACTIVITY",
                icon: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1574525021/tools/Moviapp_icono_512x512.png'
            }
        }
    }


    if (topico === 'servicio-cancelado') {
        payload = {
            notification: {
                title: 'Servicio cancelado',
                body: 'El cliente ha cancelado el servicio',
                sound: 'default',
                priority: "high",
                icon: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1574525021/tools/Moviapp_icono_512x512.png'
            }
        }
    }


    return admin.messaging().sendToDevice([token], payload)
        .then(() => response.send("OK"))
        .catch((error) => response.json({ ok: false, error }));

});