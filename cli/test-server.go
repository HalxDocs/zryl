package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusCreated)
		fmt.Fprintln(w, `{"status":"user created"}`)
	})

	fmt.Println("Test server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
