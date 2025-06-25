import Note from "../models/Note.js"

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({createdAt:-1})
    res.status(200).json(notes)
  } catch (error) {
    res
    .status(500)
    .json({ message: "Internal server error, could not get Notes" })
    console.error(error)
  }
}

export const getNoteById = async (req, res) => {
  try {
    const singleNote = await Note.findById(req.params.id)
    if (!singleNote)
      return res.status(404).json({ message: "Single note not found!" })
    res.json({singleNote})
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, could not get single note" })
    console.error(error)
  }
}

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body
    const newNote = new Note({ title, content })
    await newNote.save()
    res.status(200).json({ title, content })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, could not send notes" })
    console.error(error)
  }
}

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    })
    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: "Note not found could not update!" })
    }
    res.status(200).json({ message: "Note updated successfully" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, could not update notes" })
    console.error(error)
  }
}

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    if (!deletedNote) {
      return res
        .status(404)
        .json({ message: "Note not found could not update!" })
    }
    res.status(200).json({ message: "Note deleted successfully!" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, could not delete notes" })
    console.error(error)
  }
}

