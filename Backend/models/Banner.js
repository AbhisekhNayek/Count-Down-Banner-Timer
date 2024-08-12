const db = require('../config/db');

const Banner = {
    getBanner: callback => {
        console.log("Get function has been invoked");
        db.query('SELECT * FROM banner', (err, results) => {
            if (err) {
                console.error('Error fetching banner:', err.message);
                return callback(err);
            }
            callback(null, results);
        });
    },

    updateBanner: (data, callback) => {
        const { description, timer, link } = data;
        db.query(
            'UPDATE banner SET description = ?, timer = ?, link = ? WHERE id = 1',
            [description, timer, link],
            (err, results) => {
                if (err) {
                    console.error('Error updating banner:', err.message);
                    return callback(err);
                }
                callback(null, results);
            }
        );
    },

    addBanner: (data, callback) => {
        const { description, timer, link } = data;
        db.query(
            'INSERT INTO banner (description, timer, link) VALUES (?, ?, ?)',
            [description, timer, link],
            (err, results) => {
                if (err) {
                    console.error('Error adding banner:', err.message);
                    return callback(err);
                }
                callback(null, results);
            }
        );
    }
};

module.exports = Banner;
