provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "mysql" {
  name = "mysql-sg"

  ingress {
    from_port = 3306
    to_port = 3306
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "backend" {
  name = "backend-sg"

  ingress {
    from_port = 3001
    to_port = 3001
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "frontend" {
  name = "frontend-sg"

  ingress {
    from_port = 3000
    to_port = 3000
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "mysql" {
  identifier = "asrh-mysql-db"
  engine = "mysql"
  instance_class = "db.t2.micro"
  allocated_storage = 10
  db_name = "asrh_data"
  username = "test_user"
  password = "test_password"
  publicly_accessible = true
  skip_final_snapshot = true
  vpc_security_group_ids = [aws_security_group.mysql.id]
}

resource "aws_instance" "backend" {
  ami = "ami-007855ac798b5175e"
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.backend.id]

  tags = {
    Name = "tf-asrh-backend"
  }
}

resource "aws_instance" "frontend" {
  ami = "ami-007855ac798b5175e"
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.frontend.id]

  tags = {
    Name = "tf-asrh-frontend"
  }
}
