package at.fhv.jeb.matrix.rest

import at.fhv.jeb.matrix.dto.MatrixResultDTO
import at.fhv.jeb.matrix.objects.Matrix
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/matrix")
class MatrixController {

    @GetMapping("/multiplyMatrix")
    fun multiplyMatrix(
        @RequestParam("size") size: Int
    ): MatrixResultDTO {
        val matrixA = Matrix.createRandomMatrix(size, size)
        val matrixB = Matrix.createRandomMatrix(size, size)

        val result = matrixA.multiply(matrixB)

        return MatrixResultDTO(matrixA.matrix, matrixB.matrix, result.matrix.matrix, result.timeNs)
    }

    @GetMapping("/addMatrix")
    fun addMatrix(
        @RequestParam("size") size: Int
    ): MatrixResultDTO {
        val matrixA = Matrix.createRandomMatrix(size, size)
        val matrixB = Matrix.createRandomMatrix(size, size)

        val result = matrixA.add(matrixB)

        return MatrixResultDTO(matrixA.matrix, matrixB.matrix, result.matrix.matrix, result.timeNs)
    }
}