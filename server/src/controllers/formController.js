import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createForm = async (req, res) => {
  try {
    const { limit, startDate, endDate } = req.body;
    const form = await prisma.form.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        limit: parseInt(limit),
      },
    });
    res.json({ formId: form.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create form.' });
  }
};

export const getForm = async (req, res) => {
  try {
    const form = await prisma.form.findUnique({
      where: { id: req.params.id },
      include: { submissions: true },
    });
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: 'Form not found.' });
  }
};

export const submitForm = async (req, res) => {
  try {
    const { title, description } = req.body;

    const form = await prisma.form.findUnique({
      where: { id: req.params.id },
      include: { submissions: true }, // coz, by Default prisma only fetch the field without there values. So, to get values you need to include the desired field.
    });

    if (!form) {
      return res.status(404).json({ error: 'Form not found.' });
    }

    const now = new Date();
    const today = new Date(now.toDateString()); // strips time
    const start = new Date(new Date(form.startDate).toDateString());
    const end = new Date(new Date(form.endDate).toDateString());

    if (today < start) {
      return res.status(400).json({ error: 'Form is not active yet.' });
    }

    if (today > end) {
      return res.status(400).json({ error: 'Form has expired.' });
    }

    if (form.submissions.length >= form.limit) {
      return res.status(400).json({ error: 'Submission limit reached.' });
    }

    const submission = await prisma.submission.create({
      data: {
        title,
        description,
        formId: req.params.id,
      },
    });

    res.json(submission);
  } catch (err) {
    console.error('Submission error:', err);
    res.status(500).json({ error: 'Submission failed.' });
  }
};

