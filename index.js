//Imports
const express = require('express');
const { isNull } = require('util');
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
    else if(isNaN(parseInt(telefoneCliente))){
        res.status(400).json({message: "telefone deve conter apenas numeros"});
        return;
    }

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
        res.status(404).json({message: "Cliente não encontrado"});
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
        res.status(404).json({message: "Cliente não encontrado"});
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
    else if(isNaN(parseInt(cliente.telefoneCliente))){
        res.status(400).json({message: "telefone deve conter apenas numeros"});
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
        res.status(404).json({message: "Cliente não encontrado"});
        return;
    }

    clientes.splice(index, 1);
    res.status(200).json({message: "Cliente removido com sucesso"});
});

//Carros
let carros = [];
let idCarros = 1;

app.get('/carros', (req, res) => {
    res.status(200).json(carros);
});

app.post('/carros', (req, res) => {
    const id = idCarros;
    const marcaCarro = req.body.marca;
    const modeloCarro = req.body.modelo;
    const tamanhoCarro = req.body.tamanho;
    const id_cliente = req.body.id_cliente;

    //Validações
    if(marcaCarro.length < 3){
        res.status(400).json({message: "marca deve conter no mínimo 3 caracteres"});
        return;
    }
    else if(marcaCarro.length > 50){
        res.status(400).json({message: "marca deve conter no máximo 50 caracteres"});
        return;
    }

    if(modeloCarro.length < 2){
        res.status(400).json({message: "modelo deve conter no mínimo 2 caracteres"});
        return;
    }
    else if(modeloCarro.length > 50){
        res.status(400).json({message: "modelo deve conter no máximo 50 caracteres"});
        return;
    }

    if(tamanhoCarro != "HATCH" && tamanhoCarro != "SEDAN" && tamanhoCarro != "SUV" && tamanhoCarro != "PICAPE"){
        res.status(400).json({message: "tamanho deve ser HATCH, SEDAN, SUV ou PICAPE"});
        return;
    }

    const index = clientes.findIndex(c => c.id == id_cliente);
    if(index == -1){
        res.status(400).json({message: "id_cliente não corresponde a um cliente cadastrado"});
        return;
    }

    const novoCarro = {
        id: id,
        marca: marcaCarro,
        modelo: modeloCarro,
        tamanho: tamanhoCarro,
        id_cliente: id_cliente
    }

    carros.push(novoCarro);
    idCarros++;
    res.status(201).json({message: "Carro cadastrado com sucesso"});
});

app.get('/carros/:codigo', (req, res) => {
    const id = req.params.codigo;
    const index = carros.findIndex(c => c.id == id);

    //Validações
    if(index == -1){
        res.status(404).json({message: "Carro não encontrado"});
        return;
    }

    res.status(200).json(carros[index]);
});

app.put('/carros/:codigo', (req, res) => {
    const carro = req.body;
    const index = carros.findIndex(c => c.id == carro.id);

    //Validações
    if(carro.id <= 0){
        res.status(400).json({message: "codigo deve ser maior que 0"});
        return;
    }
    else if(index == -1){
        res.status(404).json({message: "Carro não encontrado"});
        return;
    }

    if(carro.marca.length < 3){
        res.status(400).json({message: "marca deve conter no mínimo 3 caracteres"});
        return;
    }
    else if(carro.marca.length > 50){
        res.status(400).json({message: "marca deve conter no máximo 50 caracteres"});
        return;
    }

    if(carro.modelo.length < 2){
        res.status(400).json({message: "modelo deve conter no mínimo 2 caracteres"});
        return;
    }
    else if(carro.modelo.length > 50){
        res.status(400).json({message: "modelo deve conter no máximo 50 caracteres"});
        return;
    }

    if(carro.tamanho != "HATCH" && carro.tamanho != "SEDAN" && carro.tamanho != "SUV" && carro.tamanho != "PICAPE"){
        res.status(400).json({message: "tamanho deve ser HATCH, SEDAN, SUV ou PICAPE"});
        return;
    }

    const indexCliente = clientes.findIndex(c => c.id == carro.id_cliente);
    if(indexCliente == -1){
        res.status(400).json({message: "id_cliente não corresponde a um cliente cadastrado"});
        return;
    }

    carros[index] = carro;
    res.status(201).json({message: "Carro atualizado com sucesso"});
});

app.delete('/carros/:codigo', (req, res) => {
    const id = req.params.codigo;
    const index = carros.findIndex(c => c.id == id);

    if(index == -1){
        res.status(404).json({message: "Carro não encontrado"});
        return;
    }

    carros.splice(index, 1);
    res.status(200).json({message: "Carro removido com sucesso"});
});

//Servicos
let servicos = [];
let idServicos = 1;

app.get('/servicos', (req, res) => {
    res.status(200).json(servicos);
});

app.post('/servicos', (req, res) => {
    const id = idServicos;
    const descricaoServico = req.body.descricao;
    const valoresServico = req.body.valores;
    const indexValorZero = valoresServico.findIndex(v => v.valor <= 0);

    //Validações
    if(descricaoServico.length < 5){
        res.status(400).json({message: "descricao deve conter no mínimo 5 caracteres"});
        return;
    }
    else if(descricaoServico.length > 100){
        res.status(400).json({message: "descricao deve conter no máximo 100 caracteres"});
        return;
    }

    if(indexValorZero != -1){
        res.status(400).json({message: `O valor para ${valoresServico[indexValorZero].tamanho} deve ser igual ou maior que 0`});
        return;
    }

    const novoServico = {
        id: id,
        descricao: descricaoServico,
        valores: valoresServico
    }

    servicos.push(novoServico);
    idServicos++;
    res.status(201).json({message: "Servico cadastrado com sucesso"});
});

app.get('/servicos/:codigo', (req, res) => {
    const index = servicos.findIndex(s => s.id == req.params.codigo);

    //Validação
    if(index == -1){
        res.status(404).json({message: "Servico não encontrado"});
        return;
    }

    res.status(200).json(servicos[index]);
});

app.put('/servicos/:codigo', (req, res) => {
    const servico = req.body;
    const index = servicos.findIndex(s => s.id == servico.id);
    const indexValorZero = servico.valores.findIndex(v => v.valor <= 0);

    //Validações
    if(servico.id <= 0){
        res.status(400).json({message: "Codigo deve ser maior que 0"});
        return;
    }
    else if(index == -1){
        res.status(404).json({message: "Servico não encontrado"});
        return;
    }

    if(servico.descricao.length < 5){
        res.status(400).json({message: "descricao deve conter no mínimo 5 caracteres"});
        return;
    }
    else if(servico.descricao.length > 100){
        res.status(400).json({message: "descricao deve conter no máximo 100 caracteres"});
        return;
    }

    if(indexValorZero != -1){
        res.status(400).json({message: `O valor para ${servico.valores[indexValorZero].tamanho} deve ser igual ou maior que 0`});
        return;
    }

    servicos[index] = servico;
    res.status(201).json({message: "Servico atualizado com sucesso"});
});

app.delete('/servicos/:codigo', (req, res) => {
    const index = servicos.findIndex(s => s.id == req.params.codigo);

    //Validação
    if(index == -1){
        res.status(404).json({message: "Servico não encontrado"});
        return;
    }

    servicos.splice(index, 1);
    res.status(200).json({message: "Servico removido com sucesso"});
});

//Porta do servidor
app.listen('3000', () => {
    console.log('Servidor rodando na porta 3000');
});

//Agendamentos
let agendamentos = [];
let idAgendamentos = 1;

app.get('/agendamentos', (req, res) => {
    res.status(200).json(agendamentos);
});

app.post('/agendamentos', (req, res) => {
    const id = idAgendamentos;
    const id_carroAgendamento = req.body.id_carro;
    const id_servicoAgendamento = req.body.id_servico;
    const data_horaAgendamento = req.body.data_hora;

    const indexCarro = carros.findIndex(c => c.id == id_carroAgendamento);
    const indexServico = servicos.findIndex(s => s.id == id_servicoAgendamento);

    if(indexCarro == -1){
        res.status(404).json({message: "id_carro não corresponde a um carro cadastrado"});
        return;
    }
    if(indexServico == -1){
        res.status(404).json({message: "id_servico não corresponde a um serviço cadastrado"});
        return;
    }

    if(isNull(data_horaAgendamento)){
        res.status(400).json({message: "'data_hora' deve ser informado"});
        return;
    }

    const novoAgendamento = {
        id: id,
        id_carro: id_carroAgendamento,
        id_servico: id_servicoAgendamento,
        data_hora: data_horaAgendamento
    }

    agendamentos.push(novoAgendamento);
    res.status(201).json({message: "Agendamento cadastrado com sucesso"});

});

//Exports
module.exports = app;