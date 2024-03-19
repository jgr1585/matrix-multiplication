package at.fhv.jeb.matrix.dto

data class MatrixResultDTO(
    val matrixA: List<List<Int>>,
    val matrixB: List<List<Int>>,
    val result: List<List<Int>>,
    val timeNs: Long
)