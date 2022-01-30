const httpStatus = require('http-status');
const { insert, list, modify, remove } = require("../services/Categories");

const create = (req, res) => {
    insert(req.body)
        .then((response) => res.status(httpStatus.CREATED).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}
const index = (req, res) => {
    list()
        .then((response) => res.status(httpStatus.OK).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const update = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: 'Id information is required.' });
    }
    modify({ _id: req.params.id }, req.body)
        .then(response => {
            if(!response)
                return res.status(httpStatus.NOT_FOUND).send({ error: 'Category not found.' });

            res.status(httpStatus.OK).send(response)
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const deleteCategory = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: 'Id information is required.' });
    }
    
    remove(req.params.id)
        .then(response => {
            if(!response) 
                return res.status(httpStatus.NOT_FOUND).send({ error: 'Category not found.' });
            
            res.status(httpStatus.OK).send({ message: "Expense deleted" })
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))    
}

module.exports = {
    index,
    create,
    update,
    deleteCategory
}