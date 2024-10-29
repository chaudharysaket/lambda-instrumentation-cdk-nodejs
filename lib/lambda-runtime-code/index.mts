import * as newrelic from 'newrelic';

console.log("Lambda Handler starting up");

export const handler = async (event: any, context: any) => {
    newrelic.recordCustomEvent("MyNodeEvent", {
        "zip": "zap"
    });

    newrelic.addCustomAttributes({
        "customAttribute": "customAttributeValue"
    });

    console.log("Hello, world");
    return "Success!";
};