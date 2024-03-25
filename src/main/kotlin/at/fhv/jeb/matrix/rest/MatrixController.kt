package at.fhv.jeb.matrix.rest

import at.fhv.jeb.matrix.dto.MatrixResultDTO
import at.fhv.jeb.matrix.objects.Matrix
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.io.File
import java.io.FileOutputStream
import java.io.ObjectInputStream
import java.io.ObjectOutputStream
import java.util.concurrent.Executors

@RestController
@RequestMapping("/matrix")
class MatrixController {

    private val tmp = System.getProperty("java.io.tmpdir")

    companion object {
        private val executor = Executors.newSingleThreadExecutor()
    }


    @GetMapping("/multiplyMatrix")
    fun multiplyMatrix(
        @RequestParam("size") size: Int,
        @RequestParam("uuid") uuid: String?
    ): MatrixResultDTO {
        val matrixA = Matrix.createRandomMatrix(size, size)
        val matrixB = Matrix.createRandomMatrix(size, size)

        val result = matrixA.multiply(matrixB)
        val matrixResultDTO = MatrixResultDTO(matrixA.matrix, matrixB.matrix, result.matrix.matrix, result.timeNs)

        executor.submit {
            saveFile(uuid, matrixResultDTO)
        };

        return matrixResultDTO
    }

    @GetMapping("/addMatrix")
    fun addMatrix(
        @RequestParam("size") size: Int,
        @RequestParam("uuid") uuid: String?
    ): MatrixResultDTO {
        val matrixA = Matrix.createRandomMatrix(size, size)
        val matrixB = Matrix.createRandomMatrix(size, size)

        val result = matrixA.add(matrixB)
        val matrixResultDTO = MatrixResultDTO(matrixA.matrix, matrixB.matrix, result.matrix.matrix, result.timeNs)

        executor.submit {
            saveFile(uuid, matrixResultDTO)
        };

        return matrixResultDTO
    }

    @GetMapping("downloadMatrix")
    fun downloadMatrix(
        @RequestParam("uuid") uuid: String
    ): List<MatrixResultDTO> {
        val file = File("$tmp/$uuid.blob")
        val ois = ObjectInputStream(file.inputStream())
        val matrixResultDTOList = mutableListOf<MatrixResultDTO>()
        try {
            while (true){
                val matrixResultDTO = ois.readObject() as MatrixResultDTO
                matrixResultDTOList.add(matrixResultDTO)
            }
        } catch (e: Exception) {
            // End of file reached
        }
        ois.close()
        return matrixResultDTOList
    }

    private fun saveFile(uuid: String?, matrixResultDTO: MatrixResultDTO) {
        if (uuid != null) {
            val file = File("$tmp/$uuid.blob")
            if (!file.exists()) {
                file.createNewFile()
            }

            val oos = if (file.length() == 0L) {
                ObjectOutputStream(FileOutputStream(file))
            } else {
                AppendableObjectOutputStream(FileOutputStream(file, true))
            }

            oos.writeObject(matrixResultDTO)
            oos.close()
        }
    }

    private class AppendableObjectOutputStream(out: FileOutputStream) : ObjectOutputStream(out) {
        override fun writeStreamHeader() {
            // do not write a header, but reset:
            reset()
        }
    }
}