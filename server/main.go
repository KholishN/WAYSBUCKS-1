package main

import (
	"fmt"
	"net/http"
	"waysbucks/database"
	"waysbucks/pkg/mysql"
	"waysbucks/routes"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	//initial DB
	mysql.DatabaseInit()

	//run migration
	database.RunMigration()

	r := mux.NewRouter()

	routes.RouteInit(r.PathPrefix("/api/v1").Subrouter())

	//path file
	r.PathPrefix("/uploads").Handler(http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))

	// Setup allowed Header, Method, and Origin for CORS
	var AllowedHeaders = handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	var AllowedMethods = handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"})
	var AllowedOrigins = handlers.AllowedOrigins([]string{"*"})

	var port = "5000"

	fmt.Println("Server Running on localhost:" + port)

	// Embed the setup allowed in 2 parameter on this below code ...
	http.ListenAndServe("localhost:"+port, handlers.CORS(AllowedHeaders, AllowedMethods, AllowedOrigins)(r))
}
