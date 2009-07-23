var Crypto = {
	util: {

		// Convert n to unsigned 32-bit integer
		u32: function (n) {
			return n >>> 0;
		},

		// Unsigned 32-bit addition
		add: function (m, n) {

			// Shortcut
			var u32 = this.u32;

			// If only two numbers given, add them
			if (arguments.length == 2)
				return u32(u32(m) + u32(n));

			// Else, add any number of arguments
			var result = arguments[0];
			for (var i = 1; i < arguments.length; i++)
				result = this.add(result, arguments[i]);
			return result;

		},

		// Unsigned 32-bit multiplication
		mult: function (m, n) {
			return this.add((n & 0xFFFF0000) * m,
			                (n & 0x0000FFFF) * m);
		},

		// Unsigned 32-bit greater than (>) comparison
		gt: function (m, n) {
			return this.u32(m) > this.u32(n);
		},

		// Unsigned 32-bit less than (<) comparison
		lt: function (m, n) {
			return this.u32(m) < this.u32(n);
		},

		// Bit-wise rotate left
		rotl: function (n, b) {
			return (n << b) | (n >>> (32 - b));
		},

		// Bit-wise rotate right
		rotr: function (n, b) {
			return (n << (32 - b)) | (n >>> b);
		},

		// Swap big-endian to little-endian and vice versa
		endian: function (n) {

			// If number given, swap endian
			if (n.constructor == Number) {
				return this.rotl(n,  8) & 0x00FF00FF |
				       this.rotl(n, 24) & 0xFF00FF00;
			}

			// Else, assume array and swap all items
			for (var i = 0; i < n.length; i++)
				n[i] = this.endian(n[i]);
			return n;

		},

		// Convert a string to a byte array
		string_bytes: function (str) {
			var bytes = [];
			for (var i = 0; i < str.length; i++)
				bytes.push(str.charCodeAt(i));
			return bytes;
		},

		// Convert a byte array to a string
		bytes_string: function (bytes) {
			var str = [];
			for (var i = 0; i < bytes.length; i++)
				str.push(String.fromCharCode(bytes[i]));
			return str.join("");
		},

		// Convert a string to big-endian 32-bit words
		string_words: function (str) {
			var words = [];
			for (var c = 0, b = 0; c < str.length; c++, b += 8)
				words[b >>> 5] |= str.charCodeAt(c) << (24 - b % 32);
			return words;
		},

		// Convert big-endian 32-bit words to a string
		words_string: function (words) {
			var str = [];
			for (var b = 0; b < words.length * 32; b += 8)
				str.push(String.fromCharCode((words[b >>> 5] >>> (24 - b % 32)) & 0xFF));
			return str.join("");
		}

	}
};
