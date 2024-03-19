package at.fhv.jeb.matrix.objects

class Matrix(
    val matrix: List<List<Int>>
) {
    companion object {
        fun createRandomMatrix(rows: Int, cols: Int): Matrix {
            return Matrix(
                (0 ..< rows).map {
                    (0 ..< cols).map {
                        (0..100).random()
                    }
                }
            )
        }
    }

    fun print() {
        for (row in matrix) {
            for (cell in row) {
                print("$cell ")
            }
            println()
        }
    }

    fun multiply(other: Matrix): Result {
        val startTime = System.nanoTime()
        val result = matrix.map { row ->
            List(row.size) { j ->
                matrix.indices.sumOf { k ->
                    row[k] * other.matrix[k][j]
                }
            }
        }

        return Result(Matrix(result), System.nanoTime() - startTime)
    }

    fun add(other: Matrix): Result {
        val startTime = System.nanoTime()
        val result = matrix.mapIndexed { i, row ->
                row.mapIndexed { j, cell ->
                    cell + other.matrix[i][j]
                }
            }

        return Result(Matrix(result), System.nanoTime() - startTime)
    }


    class Result(
        val matrix: Matrix,
        val timeNs: Long
    )
}