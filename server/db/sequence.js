// 用于生成自增长的序列段，此处用于生成文章的aid
var mongoose = require('mongoose')

var Schema = mongoose.Schema
/**
 * 存储ID的序列值
 */
// eslint-disable-next-line no-undef
SequenceSchema = new Schema({
    _id: String,
    next: Number
})

// eslint-disable-next-line no-undef
SequenceSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback)
}

// eslint-disable-next-line no-undef
SequenceSchema.statics.increment = function (schemaName, callback) {
    return this.collection.findAndModify({ _id: schemaName }, [],
        { $inc: { next: 1 } }, { 'new': true, upsert: true }, callback)
}

// eslint-disable-next-line no-undef
var Sequence = mongoose.model('Sequence', SequenceSchema)

module.exports = Sequence

