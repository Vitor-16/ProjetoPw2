const express = require('express');

const router = express.Router();

const modelLivro = require('../models/modelLivro');

router.post('/livro/cadastrarLivro', (req, res)=>{

    const { titulo, preco, detalhes, imagen_peq, imagen_grd, tblCategoriaumId } = req.body;

    modelLivro.create(
        {
            titulo,
            preco,
            imagen_peq,
            imagen_grd,
            detalhes,
            imagen_peq,
            imagen_grd,
            tblCategoriaumId

        }
    ).then(
        ()=>{
            return res.status(201).json({
                erroStatus:false,
                mensagemStatus:'Livro inserido com sucesso.'
            });      
        }
    ).catch((erro)=>{
        return res.status(400).json({
            erroStatus: true,
            erroMensagem: erro
        });
    });

});

router.get('/livro/listarLivro', (req, res)=>{

    modelLivro.findAll()
        .then((livros)=>{
            return res.status(200).json(livros)
        }).catch((erro)=>{
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.get('/livro/listarLivroCodigo/:id', (req, res)=>{

    const { id } = req.params

    modelLivro.findByPk(id)
        .then((livro)=>{
            return res.status(200).json(livro)
        }).catch((erro)=>{
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.delete('/livro/excluirLivro/:id', (req, res)=>{

    const { id } = req.params;

    modelLivro.findByPk(id)

        .then((livro)=>{

            livro.destroy({
                where:{id}
            }).then(
                ()=>{

                    return res.status(200).json({
                        erroStatus:false,
                        mensagemStatus:'Livro excluído com sucesso.'
                    });

                }).catch((erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMensagem: erro
                    });
                });

        });

});

router.put('/livro/editarLivro', (req, res)=>{

    const { titulo, preco, detalhes, imagen_peq, imagen_grd, tblCategoriaumId, id } = req.body;

    /** UPDATE SEM IMAGEM **/
    modelLivro.update(
        {titulo,
        preco,
        detalhes,
        imagen_peq, 
        imagen_grd,
        tblCategoriaumId},
        {where: {id}}
    ).then(
        ()=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:'Livro alterado com sucesso.'
            });
        }).catch((erro)=>{
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });

});

module.exports = router;