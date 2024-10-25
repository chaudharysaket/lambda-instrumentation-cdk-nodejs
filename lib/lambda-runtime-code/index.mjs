import newrelic from 'newrelic';

console.log("Lambda Handler starting up");

export const handler = async (event, context) => {
    newrelic.recordCustomEvent("MyNodeEvent", {
        "zip": "zap"
    });

    newrelic.addCustomAttributes({
        "customAttribute": "customAttributeValue"
    });

    console.log("Hello, world");
    return "Success!";
};