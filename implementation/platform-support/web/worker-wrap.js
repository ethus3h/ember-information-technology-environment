// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0

if (window.Worker) {
    let eiteWorker = new Worker('eite.js');
    
}
else {
    console.log('Web worker required.');
    throw 'Web worker required.';
}

// @license-end
