package sparkserver

import com.google.gson.Gson
import spark.Request
import spark.Response
import spark.Spark.*

import java.sql.DriverManager

fun main() {
    staticFiles.location("/public")
    port(getHerokuPort())

    get("/") { req,res -> "index.html" } // get pliku index.html
    get("/game") { req,res -> serveGame(req,res) } // get pliku game.html
    get("/editor") { req,res -> serveEditor(req,res) } // get pliku editor.html
    post("/add") { req,res -> add(req,res) } // dodanie danych levelu
    post("/load") { req,res -> load(req,res) } // pobranie danych levelu

}

fun getHerokuPort(): Int {
    val processBuilder = ProcessBuilder()
    return if (processBuilder.environment()["PORT"] != null) {
        processBuilder.environment()["PORT"]!!.toInt()
    } else 5000
}

fun serveGame(req: Request,res: Response) {
    res.type("text/html")
    res.redirect("game.html")
}

fun serveEditor(req: Request,res: Response) {
    res.type("text/html")
    res.redirect("editor.html")
}

fun add(req: Request, res: Response){
//    to dodaje jsona to listy
}

fun load(req:Request,res:Response){
    // to zwraca jsona
}