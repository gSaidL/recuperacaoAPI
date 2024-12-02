//Imports
const express = require('express');
const app = express();
app.use(express.json());

//Clientes
let clientes = [];
let idClientes = 1;

app.get('/clientes', (req, res) => {
    res.status(200).json(clientes);
});

app.post('/clientes', (req, res) => {
    const id = idClientes;
    const nomeCliente = req.body.nome;
    const telefoneCliente = req.body.telefone;

    //Validações
    if(nomeCliente.length < 3){
        res.status(400).json({message: "nome deve conter no mínimo 3 caracteres"});
        return;
    }
    else if(nomeCliente.length > 100){
        res.status(400).json({message: "nome deve conter no máximo 100 caracteres"});
        return;
    }

    if(telefoneCliente.length != 11){
        res.status(400).json({message: "telefone deve conter exatamente 11 dígitos"});
        return;
    }
    //A fazer verificação se é número

    const novoCliente = {
        id: id,
        nome: nomeCliente,
        telefone: telefoneCliente
    }

    clientes.push(novoCliente);
    idClientes++;
    res.status(201).json({message: "Usuario criado com sucesso"});
});

app.get('/clientes/:codigo', (req, res) => {
    const id = req.params.codigo;
    const index = clientes.findIndex(c => c.id == id);

    //Validações
    if(index == -1){
        res.status(404).json({message: "Usuario não encontrado"});
        return;
    }

    res.status(200).json(clientes[index]);
});

app.put('/clientes/:codigo', (req, res) => {
    const cliente = req.body;
    const index = clientes.findIndex(c => c.id == cliente.id);

    //Validações
    if(cliente.id <= 0){
        res.status(400).json({message: "codigo deve ser maior que 0"});
        return;
    }
    else if(index == -1){
        res.status(404).json({message: "Usuario não encontrado"});
        return;
    }

    if(cliente.nome.length < 3){
        res.status(400).json({message: "nome deve conter no mínimo 3 caracteres"});
        return;
    }
    else if(cliente.nome.length > 100){
        res.status(400).json({message: "nome deve conter no máximo 100 caracteres"});
        return;
    }

    if(cliente.telefone.length != 11){
        res.status(400).json({message: "telefone deve conter exatamente 11 dígitos"});
        return;
    }

    clientes[index] = cliente;
    res.status(201).json({message: "Cliente atualizado com sucesso"});
});

app.delete('/clientes/:codigo', (req, res) => {
    const id = req.params.codigo;
    const index = clientes.findIndex(c => c.id == id);

    //Validações
    if(index == -1){
        res.status(404).json({message: "Usuario não encontrado"});
        return;
    }

    clientes.splice(index, 1);
    res.status(200).json({message: "Cliente removido com sucesso"});
});

//Porta do servidor
app.listen('3000', () => {
    console.log('Servidor rodando na porta 3000');
});

//Exports
module.exports = app;