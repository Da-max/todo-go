export default function () {

    const pushNotification = function (msg: string): void {
        console.log("Une notification a été ajouté : " + msg);
    }


    return {
        pushNotification
    }

}