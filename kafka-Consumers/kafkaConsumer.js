var kafka = require('kafka-node');
var express = require('express');
var app = express();
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient('localhost:9092/'),
    consumer = new Consumer(client,
        [{ topic: 'Posts', offset: 0}],
        {
            autoCommit: false
        }
    );
consumer.on('message', function (message) {
    console.log(message);
});

consumer.on('error', function (err) {
    console.log('Error:',err);
})

consumer.on('offsetOutOfRange', function (err) {
    console.log('offsetOutOfRange:',err);
})
app.listen(5002, function() {
	console.log('Kafka consumer running at 5002')
})