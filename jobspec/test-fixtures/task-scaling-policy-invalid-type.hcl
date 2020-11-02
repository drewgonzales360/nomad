job "foo" {
  task "bar" {
    driver = "docker"

    scaling "cpu" {
      type    = "vertical_mem"
      enabled = true
      min     = 50
      max     = 1000

      policy {
        test = "cpu"
      }
    }

  }
}

