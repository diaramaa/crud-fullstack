const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

//json
app.use(express.json());

//cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//test api
app.get('/test', (req, res) => {
    try {
      res.status(201).json({ message: 'API is working' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// CREATE: Tambah User Baru
app.post('/users', async (req, res) => {
  const { name, email, phoneNum } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, phoneNum },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ: Ambil Semua User
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(201).json(users);
} catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ: Ambil User Berdasarkan ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE: Ubah Data User
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNum } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, phoneNum },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE: Hapus User
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Jalankan Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
