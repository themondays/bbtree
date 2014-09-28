'use strict';

module.exports = bsarray;

// really simple pseudo-bst array wrapper

function bsarray(compare) {
    return new BSArray(compare);
};

function BSArray(compare) {
    this.compare = compare || defaultCompare;
    this.items = [];
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

BSArray.prototype = {

    insert: function (key, value) {

        var items = this.items,
            compare = this.compare,
            i = 0,
            j = items.length - 1;

        while (j > i) {
            var pivot = Math.floor((i + j) / 2);
            var c = compare(key, items[pivot].key);
            if (c === 0) return false;
            if (c < 0) j = pivot - 1;
            else i = pivot + 1;
        }

        if (items.length) {
            var c = compare(key, items[i].key);
            if (c === 0) return false;
            if (c > 0) i++;
        } else i = 0;

        items.splice(i, 0, {key: key, value: value});

        return true;
    },

    find: function (key) {

        var items = this.items,
            compare = this.compare,
            i = 0,
            j = items.length - 1;

        while (true) {
            var pivot = Math.floor((i + j) / 2);
            if (j < i) return null;
            var c = compare(key, items[pivot].key);
            if (c === 0) return pivot;
            if (j == i) return null;
            if (c < 0) j = pivot - 1;
            else i = pivot + 1;
        }
    },

    remove: function (key) {
        var index = this.find(key);
        if (index !== null) this.removeAt(index);
    },

    removeAt: function (index) {
        this.items.splice(index, 1);
    }
};
